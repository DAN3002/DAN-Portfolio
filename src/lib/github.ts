// GitHub stats from keyless public endpoints, so nothing secret exists anywhere:
//
//   contributions  github-contributions-api.jogruber.de/v4/<user>?y=all|last
//                  (scrapes the public profile graph; same totals visitors see on
//                  github.com, incl. private contributions the profile chooses to show)
//   profile/stars  api.github.com/users/<user> and /users/<user>/repos  (60 req/h per IP)
//   commits        api.github.com/search/commits?q=author:<user>         (10 req/min per IP,
//                  public commits only; GitHub has no keyless all-commits count)
//
// Used twice: at build time, so the numbers are in the HTML on first paint, and
// in the browser (lib/github-live.ts) to refresh them with a localStorage cache.
// Every endpoint sends `Access-Control-Allow-Origin: *`. A field that fails is
// null and the UI hides it instead of showing 0.

export const GITHUB_USER = 'DAN3002';
const REPO = 'DAN3002/DAN-Portfolio';
const CONTRIB_API = 'https://github-contributions-api.jogruber.de/v4';
const TIMEOUT_MS = 10_000;

export interface ContributionDay {
	date: string;
	count: number;
	/** 0 (none) to 4 (most), GitHub's own quartiles. */
	level: 0 | 1 | 2 | 3 | 4;
}

export interface GithubStats {
	repos: number | null;
	stars: number | null;
	followers: number | null;
	/** All-time contributions, the sum of every year on the profile graph. */
	contributions: number | null;
	/** Public commits (search API). */
	commits: number | null;
	lastYear: { total: number; days: ContributionDay[] } | null;
	since: number | null;
	/** ISO time the numbers were fetched. */
	fetchedAt: string;
}

async function getJson<T>(url: string): Promise<T | null> {
	try {
		const res = await fetch(url, {
			headers: { Accept: 'application/vnd.github+json' },
			signal: AbortSignal.timeout(TIMEOUT_MS),
		});
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

type ContribResponse = { total: Record<string, number>; contributions: ContributionDay[] };

/** Fetches every stat in parallel. Safe to call from Node or the browser. */
export async function fetchGithubStats(user = GITHUB_USER): Promise<GithubStats> {
	const [all, last, profile, repos, commits] = await Promise.all([
		getJson<ContribResponse>(`${CONTRIB_API}/${user}?y=all`),
		getJson<{ total: { lastYear: number }; contributions: ContributionDay[] }>(`${CONTRIB_API}/${user}?y=last`),
		getJson<{ public_repos: number; followers: number; created_at: string }>(`https://api.github.com/users/${user}`),
		getJson<{ stargazers_count: number; fork: boolean }[]>(`https://api.github.com/users/${user}/repos?per_page=100&type=owner`),
		getJson<{ total_count: number }>(`https://api.github.com/search/commits?q=author:${user}&per_page=1`),
	]);

	const years = all ? Object.keys(all.total).map(Number) : [];
	return {
		repos: repos ? repos.filter((r) => !r.fork).length : (profile?.public_repos ?? null),
		stars: repos ? repos.filter((r) => !r.fork).reduce((n, r) => n + r.stargazers_count, 0) : null,
		followers: profile?.followers ?? null,
		contributions: all ? Object.values(all.total).reduce((a, b) => a + b, 0) : null,
		commits: commits?.total_count ?? null,
		lastYear: last ? { total: last.total.lastYear, days: last.contributions } : null,
		since: years.length ? Math.min(...years) : profile ? new Date(profile.created_at).getFullYear() : null,
		fetchedAt: new Date().toISOString(),
	};
}

let buildCache: Promise<GithubStats> | undefined;

/** Build-time snapshot, fetched once per build and shared by every component. */
export function getGithubStats(): Promise<GithubStats> {
	buildCache ??= fetchGithubStats().then((s) => {
		console.info(`[github] snapshot: ${s.contributions ?? '-'} contributions, ${s.commits ?? '-'} public commits`);
		return s;
	});
	return buildCache;
}

/** Date of the last commit to this site's repo, for the footer. */
export async function getLastUpdated(): Promise<Date> {
	const commits = await getJson<{ commit: { author: { date: string } } }[]>(`https://api.github.com/repos/${REPO}/commits?per_page=1`);
	const last = commits?.[0]?.commit.author.date;
	return last ? new Date(last) : new Date();
}

/** 12345 -> "12.3k", 980 -> "980". */
export function compact(n: number): string {
	return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(n).toLowerCase();
}

/** Pads the first week to a full Sun–Sat column so the grid lines up. */
export function toCells(days: ContributionDay[]): (ContributionDay | null)[] {
	if (!days.length) return [];
	const lead = new Date(`${days[0]!.date}T00:00:00Z`).getUTCDay();
	return [...Array<null>(lead).fill(null), ...days];
}
