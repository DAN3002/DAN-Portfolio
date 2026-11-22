// Browser-side refresh for the GitHub card: stale-while-revalidate.
//
// 1. The page ships with build-time numbers (instant, works without JS).
// 2. If localStorage holds a valid, newer copy, show it at once.
// 3. If the best copy is older than the TTL, fetch in the background when the
//    browser is idle, update the card in place, and store the result.
//
// Limits: GitHub allows 60 keyless REST calls/h and 10 commit searches/min per
// IP. A refresh costs 3 GitHub calls, at most once per ~6 h per visitor, and a
// failed refresh backs off for 30 min instead of retrying on every page view.

import {
	fetchGithubStats,
	mergeStats,
	isGithubStats,
	compact,
	toCells,
	monthLabels,
	describeCalendar,
	cellTitle,
	type GithubStats,
} from './github';

const KEY = 'gh-stats:v2';
const RETRY_KEY = 'gh-stats:retry-at';
// 6 h plus up to 30 min of jitter, so visitors who arrived together don't refresh together.
const TTL_MS = 6 * 3_600_000 + Math.floor(Math.random() * 1_800_000);
const BACKOFF_MS = 30 * 60_000;

function store(): Storage | null {
	try {
		return window.localStorage;
	} catch {
		return null; // blocked by privacy settings
	}
}

function read(): GithubStats | null {
	const ls = store();
	try {
		const raw = ls?.getItem(KEY);
		if (!raw) return null;
		const data: unknown = JSON.parse(raw);
		if (isGithubStats(data)) return data;
	} catch {
		/* corrupt JSON: fall through and drop it */
	}
	ls?.removeItem(KEY);
	return null;
}

function write(stats: GithubStats) {
	try {
		store()?.setItem(KEY, JSON.stringify(stats));
		store()?.removeItem(RETRY_KEY);
	} catch {
		/* quota or blocked: we simply refetch next time */
	}
}

function backingOff(): boolean {
	const until = Number(store()?.getItem(RETRY_KEY));
	return Number.isFinite(until) && until > Date.now();
}

function backOff() {
	try {
		store()?.setItem(RETRY_KEY, String(Date.now() + BACKOFF_MS));
	} catch {
		/* ignore */
	}
}

function relative(iso: string): string {
	const mins = Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 60000));
	if (mins < 1) return 'just now';
	if (mins < 60) return `${mins} min ago`;
	const hours = Math.round(mins / 60);
	if (hours < 48) return `${hours} h ago`;
	return `${Math.round(hours / 24)} days ago`;
}

/** Writes only text and attributes (never HTML), so fetched data can't inject markup. */
function render(root: HTMLElement, s: GithubStats) {
	root.querySelectorAll<HTMLElement>('[data-gh-stat]').forEach((el) => {
		const v = s[el.dataset.ghStat as keyof GithubStats];
		if (typeof v === 'number') {
			el.textContent = compact(v);
			el.title = v.toLocaleString('en');
		}
	});
	const since = root.querySelector<HTMLElement>('[data-gh-since]');
	if (since && s.since) since.textContent = `since ${s.since}`;

	const graph = root.querySelector<HTMLElement>('[data-gh-graph]');
	const months = root.querySelector<HTMLElement>('[data-gh-months]');
	const wrap = root.querySelector<HTMLElement>('[data-gh-wrap]');
	const empty = root.querySelector<HTMLElement>('[data-gh-empty]');
	if (s.lastYear && graph && months && wrap) {
		const cells = toCells(s.lastYear);
		const weeks = Math.ceil(cells.length / 7);
		const cols = `repeat(${weeks}, minmax(0, 1fr))`;
		for (const el of [wrap.closest<HTMLElement>('.gh-col'), wrap.closest<HTMLElement>('.gh-col')?.parentElement]) el?.style.setProperty('--weeks', String(weeks));
		graph.style.gridTemplateColumns = cols;
		months.style.gridTemplateColumns = cols;
		graph.setAttribute('aria-label', describeCalendar(s.lastYear));
		graph.replaceChildren(
			...cells.map((d) => {
				const span = document.createElement('span');
				if (d) {
					span.className = 'gh-cell';
					span.dataset.level = String(d.level);
					span.title = cellTitle(d);
				}
				return span;
			}),
		);
		months.replaceChildren(
			...monthLabels(cells).map((m) => {
				const span = document.createElement('span');
				span.textContent = m;
				return span;
			}),
		);
		wrap.hidden = false;
		if (empty) empty.hidden = true;
		root.querySelectorAll<HTMLElement>('[data-gh-year-total]').forEach((el) => (el.textContent = s.lastYear!.total.toLocaleString('en')));
	}

	const stamp = root.querySelector<HTMLTimeElement>('[data-gh-fetched]');
	if (stamp) {
		stamp.dateTime = s.fetchedAt;
		stamp.textContent = relative(s.fetchedAt);
	}
}

export async function initGithubLive(root: HTMLElement) {
	try {
		let built: GithubStats | null = null;
		try {
			const data: unknown = JSON.parse(root.dataset.ghSnapshot ?? 'null');
			built = isGithubStats(data) ? data : null;
		} catch {
			built = null;
		}
		const cached = read();
		let current = [cached, built].filter((s): s is GithubStats => !!s).sort((a, b) => b.fetchedAt.localeCompare(a.fetchedAt))[0];
		if (current) render(root, current);

		const fresh = current && Date.now() - Date.parse(current.fetchedAt) < TTL_MS;
		if (fresh || backingOff()) return;

		root.setAttribute('aria-busy', 'true');
		const next = await fetchGithubStats();
		if (next.contributions === null && next.repos === null) {
			backOff(); // everything failed (offline, rate-limited, API down)
			return;
		}
		current = current ? mergeStats(current, next) : next;
		write(current);
		render(root, current);
	} catch (err) {
		// The card already shows build-time numbers; never let a refresh break the page.
		console.warn('[github] live refresh failed', err);
		backOff();
	} finally {
		root.removeAttribute('aria-busy');
	}
}
