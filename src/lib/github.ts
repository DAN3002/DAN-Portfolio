// GitHub stats from keyless public endpoints, so nothing secret exists anywhere:
//
//   contributions  github-contributions-api.jogruber.de/v4/<user>?y=all|last
//                  (reads the public profile graph: the same totals visitors see on
//                  github.com, incl. private contributions the profile chooses to show)
//   profile/stars  api.github.com/users/<user> and /users/<user>/repos  (60 req/h per IP)
//   commits        api.github.com/search/commits?q=author:<user>         (10 req/min per IP,
//                  public commits only; GitHub has no keyless all-commits count)
//
// Isomorphic: runs at build time (lib/github-build.ts) and in the browser
// (lib/github-live.ts). Every endpoint sends `Access-Control-Allow-Origin: *`.
// A field that fails is null; callers fall back to the last good value.

export const GITHUB_USER = 'DAN3002';
const CONTRIB_API = 'https://github-contributions-api.jogruber.de/v4';
const TIMEOUT_MS = 10_000;

export type Level = 0 | 1 | 2 | 3 | 4;

/**
 * Last-year calendar in a compact form (~1.5 KB instead of ~30 KB of objects):
 * day i is `start + i days`, with `counts[i]` contributions at GitHub's `levels[i]`.
 */
export interface Calendar {
	total: number;
	start: string;
	counts: number[];
	levels: string;
}

export interface GithubStats {
	repos: number | null;
	stars: number | null;
	followers: number | null;
	/** All-time contributions, the sum of every year on the profile graph. */
	contributions: number | null;
	/** Public commits (search API). */
	commits: number | null;
	lastYear: Calendar | null;
	since: number | null;
	/** ISO time the numbers were fetched. */
	fetchedAt: string;
}

export interface Day {
	date: string;
	count: number;
	level: Level;
}

async function getJson<T>(url: string): Promise<T | null> {
	try {
		const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
		if (!res.ok) {
			console.warn(`[github] ${res.status} ${url}`);
			return null;
		}
		return (await res.json()) as T;
	} catch (err) {
		console.warn(`[github] ${url}: ${(err as Error).message}`);
		return null;
	}
}

/** Fetches every stat in parallel. */
export async function fetchGithubStats(user = GITHUB_USER): Promise<GithubStats> {
	const [all, last, profile, repos, commits] = await Promise.all([
		getJson<{ total: Record<string, number> }>(`${CONTRIB_API}/${user}?y=all`),
		getJson<{ total: { lastYear: number }; contributions: Day[] }>(`${CONTRIB_API}/${user}?y=last`),
		getJson<{ public_repos: number; followers: number; created_at: string }>(`https://api.github.com/users/${user}`),
		getJson<{ stargazers_count: number; fork: boolean }[]>(`https://api.github.com/users/${user}/repos?per_page=100&type=owner`),
		getJson<{ total_count: number }>(`https://api.github.com/search/commits?q=author:${user}&per_page=1`),
	]);

	const years = all ? Object.keys(all.total).map(Number) : [];
	const own = repos?.filter((r) => !r.fork);
	const days = last?.contributions ?? [];
	return {
		repos: own ? own.length : (profile?.public_repos ?? null),
		stars: own ? own.reduce((n, r) => n + r.stargazers_count, 0) : null,
		followers: profile?.followers ?? null,
		contributions: all ? Object.values(all.total).reduce((a, b) => a + b, 0) : null,
		commits: commits?.total_count ?? null,
		lastYear:
			last && days.length
				? { total: last.total.lastYear, start: days[0]!.date, counts: days.map((d) => d.count), levels: days.map((d) => d.level).join('') }
				: null,
		since: years.length ? Math.min(...years) : profile ? new Date(profile.created_at).getFullYear() : null,
		fetchedAt: new Date().toISOString(),
	};
}

/** Keeps the previous value for every field the newer fetch couldn't get. */
export function mergeStats(prev: GithubStats, next: GithubStats): GithubStats {
	const out = { ...next };
	for (const k of Object.keys(prev) as (keyof GithubStats)[]) {
		if (out[k] === null || out[k] === undefined) (out as Record<string, unknown>)[k] = prev[k];
	}
	return out;
}

const isNum = (v: unknown) => v === null || (typeof v === 'number' && Number.isFinite(v) && v >= 0);

/** Strict shape check for anything read from storage or a file. */
export function isGithubStats(v: unknown): v is GithubStats {
	if (!v || typeof v !== 'object') return false;
	const s = v as Record<string, unknown>;
	const t = typeof s.fetchedAt === 'string' ? Date.parse(s.fetchedAt) : NaN;
	// A timestamp in the future would pin a bad entry as "freshest" forever.
	if (!Number.isFinite(t) || t > Date.now() + 5 * 60_000) return false;
	if (!['repos', 'stars', 'followers', 'contributions', 'commits', 'since'].every((k) => isNum(s[k]))) return false;
	const y = s.lastYear as Calendar | null;
	if (y === null) return true;
	return (
		!!y &&
		typeof y.total === 'number' &&
		/^\d{4}-\d{2}-\d{2}$/.test(String(y.start)) &&
		Array.isArray(y.counts) &&
		y.counts.every((c) => Number.isInteger(c) && c >= 0) &&
		typeof y.levels === 'string' &&
		/^[0-4]*$/.test(y.levels) &&
		y.levels.length === y.counts.length
	);
}

/** Expands the compact calendar, padded so the first column starts on Sunday. */
export function toCells(cal: Calendar | null): (Day | null)[] {
	if (!cal?.counts.length) return [];
	const start = Date.parse(`${cal.start}T00:00:00Z`);
	const days: Day[] = cal.counts.map((count, i) => ({
		date: new Date(start + i * 86_400_000).toISOString().slice(0, 10),
		count,
		level: Number(cal.levels[i]) as Level,
	}));
	const lead = new Date(start).getUTCDay();
	return [...Array<null>(lead).fill(null), ...days];
}

/** One label per week column: the month name where a new month begins. */
export function monthLabels(cells: (Day | null)[]): string[] {
	const weeks = Math.ceil(cells.length / 7);
	let prev = -1;
	return Array.from({ length: weeks }, (_, w) => {
		const first = cells.slice(w * 7, w * 7 + 7).find((d) => d);
		if (!first) return '';
		const m = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
		// Skip the first column's label when it is a partial month (it would collide).
		const label = m !== prev && (w > 0 || new Date(`${first.date}T00:00:00Z`).getUTCDate() <= 7)
			? new Date(`${first.date}T00:00:00Z`).toLocaleString('en', { month: 'short', timeZone: 'UTC' })
			: '';
		prev = m;
		return label;
	});
}

/** Text alternative for the graph, so its meaning doesn't depend on colour. */
export function describeCalendar(cal: Calendar | null): string {
	if (!cal) return 'Contribution graph unavailable';
	const active = cal.counts.filter((c) => c > 0).length;
	const max = Math.max(...cal.counts);
	const best = toCells(cal).find((d) => d && d.count === max);
	return `Contribution graph: ${cal.total.toLocaleString('en')} contributions in the last year, active on ${active} of ${cal.counts.length} days` +
		(best ? `, busiest day ${fmtDay(best.date)} with ${max}` : '');
}

export const fmtDay = (d: string) =>
	new Date(`${d}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export const cellTitle = (d: Day) => `${d.count} contribution${d.count === 1 ? '' : 's'} on ${fmtDay(d.date)}`;

/** 12345 -> "12.3k", 980 -> "980". */
export function compact(n: number): string {
	return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(n).toLowerCase();
}
