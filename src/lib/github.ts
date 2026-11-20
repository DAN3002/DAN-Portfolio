// Fetched once at build time, so visitors never hit GitHub's unauthenticated
// rate limit (10 search calls/min) and the stats are in the HTML on first paint.
// Any failure falls back to null and the UI hides that stat instead of showing 0.

const USER = 'DAN3002';
const REPO = 'DAN3002/DAN-Portfolio';

async function gh<T>(path: string): Promise<T | null> {
	const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
	if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
	try {
		const res = await fetch(`https://api.github.com${path}`, { headers, signal: AbortSignal.timeout(8000) });
		if (!res.ok) return null;
		return (await res.json()) as T;
	} catch {
		return null;
	}
}

export interface GithubStats {
	repos: number | null;
	lastUpdated: Date;
}

let cached: Promise<GithubStats> | undefined;

export function getGithubStats(): Promise<GithubStats> {
	cached ??= (async () => {
		const [user, commits] = await Promise.all([
			gh<{ public_repos: number }>(`/users/${USER}`),
			gh<{ commit: { author: { date: string } } }[]>(`/repos/${REPO}/commits?per_page=1`),
		]);
		const last = commits?.[0]?.commit.author.date;
		return {
			repos: user?.public_repos ?? null,
			lastUpdated: last ? new Date(last) : new Date(),
		};
	})();
	return cached;
}
