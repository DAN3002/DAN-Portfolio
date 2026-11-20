// Browser-side refresh for the GitHub card: stale-while-revalidate.
//
// 1. The page ships with build-time numbers (instant, works without JS).
// 2. If localStorage has a newer copy, show it at once.
// 3. If that copy is older than TTL (or missing), fetch fresh data in the
//    background, update the card, and store it.
//
// The 6 h TTL keeps a visitor far below GitHub's keyless limits (60 req/h for
// REST, 10 req/min for commit search): at most 3 GitHub calls per visitor per 6 h.

import { fetchGithubStats, compact, toCells, type GithubStats } from './github';

const KEY = 'gh-stats:v1';
const TTL_MS = 6 * 60 * 60 * 1000;

function read(): GithubStats | null {
	try {
		const raw = localStorage.getItem(KEY);
		return raw ? (JSON.parse(raw) as GithubStats) : null;
	} catch {
		return null;
	}
}

function write(stats: GithubStats) {
	try {
		localStorage.setItem(KEY, JSON.stringify(stats));
	} catch {
		/* storage full or blocked: fine, we just refetch next time */
	}
}

/** Keeps the last good value per field when a fresh fetch partly fails. */
function merge(prev: GithubStats, next: GithubStats): GithubStats {
	const out = { ...next };
	for (const k of Object.keys(prev) as (keyof GithubStats)[]) {
		if (out[k] === null) (out as Record<string, unknown>)[k] = prev[k];
	}
	return out;
}

const fmtDay = (d: string) =>
	new Date(`${d}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

function render(root: HTMLElement, s: GithubStats) {
	root.querySelectorAll<HTMLElement>('[data-gh-stat]').forEach((el) => {
		const v = s[el.dataset.ghStat as keyof GithubStats];
		if (typeof v === 'number') {
			el.textContent = compact(v);
			el.title = v.toLocaleString('en');
		}
	});

	if (s.lastYear) {
		const total = s.lastYear.total.toLocaleString('en');
		root.querySelectorAll<HTMLElement>('[data-gh-year-total]').forEach((el) => (el.textContent = total));
		const graph = root.querySelector<HTMLElement>('[data-gh-graph]');
		if (graph) {
			const cells = toCells(s.lastYear.days);
			const weeks = Math.ceil(cells.length / 7);
			graph.style.setProperty('--weeks', String(weeks));
			graph.style.gridTemplateColumns = `repeat(${weeks}, minmax(0, 1fr))`;
			graph.setAttribute('aria-label', `Contribution graph: ${total} contributions in the last year`);
			graph.replaceChildren(
				...cells.map((d) => {
					const span = document.createElement('span');
					if (d) {
						span.className = 'gh-cell aspect-square rounded-[2px]';
						span.dataset.level = String(d.level);
						span.title = `${d.count} contribution${d.count === 1 ? '' : 's'} on ${fmtDay(d.date)}`;
					}
					return span;
				}),
			);
		}
	}

	const stamp = root.querySelector<HTMLTimeElement>('[data-gh-fetched]');
	if (stamp) {
		stamp.dateTime = s.fetchedAt;
		stamp.textContent = relative(s.fetchedAt);
	}
}

function relative(iso: string): string {
	const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
	if (mins < 1) return 'just now';
	if (mins < 60) return `${mins} min ago`;
	const hours = Math.round(mins / 60);
	if (hours < 48) return `${hours} h ago`;
	return `${Math.round(hours / 24)} days ago`;
}

export async function initGithubLive(root: HTMLElement) {
	const built = JSON.parse(root.dataset.ghSnapshot ?? 'null') as GithubStats | null;
	const cached = read();
	let current = [cached, built]
		.filter((s): s is GithubStats => !!s)
		.sort((a, b) => b.fetchedAt.localeCompare(a.fetchedAt))[0];

	if (current && current !== built) render(root, current);
	else if (current) render(root, current); // refresh the "fetched … ago" label

	if (current && Date.now() - new Date(current.fetchedAt).getTime() < TTL_MS) return;

	root.setAttribute('aria-busy', 'true');
	try {
		const fresh = await fetchGithubStats();
		const next = current ? merge(current, fresh) : fresh;
		// Only accept the refresh when the core field came back.
		if (fresh.contributions !== null || fresh.repos !== null) {
			current = next;
			write(next);
			render(root, next);
		}
	} finally {
		root.removeAttribute('aria-busy');
	}
}
