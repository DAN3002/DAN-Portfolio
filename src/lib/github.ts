// GitHub stats, fetched once per build (never from the visitor's browser), so
// there is no client rate limit, no token in the page, and the numbers are in
// the HTML on first paint.
//
// Source of truth is the GraphQL API with a token (GITHUB_TOKEN or GH_TOKEN):
// it returns the same contribution totals as the profile graph, including
// private contributions the profile chooses to show. Without a token we fall
// back to the public REST API, which can only count public commits. Any field
// that can't be fetched is null and the UI hides it instead of showing 0.

const USER = 'DAN3002';
const REPO = 'DAN3002/DAN-Portfolio';
const TIMEOUT_MS = 10_000;

export interface ContributionDay {
	date: string;
	count: number;
	/** 0 (none) to 4 (most), GitHub's own quartiles. */
	level: 0 | 1 | 2 | 3 | 4;
}

export interface GithubStats {
	source: 'graphql' | 'rest' | 'none';
	repos: number | null;
	stars: number | null;
	followers: number | null;
	/** All-time contributions (commits, PRs, issues, reviews), like the profile graph. */
	contributions: number | null;
	/** All-time commit count. GraphQL: commit contributions incl. private; REST: public commits only. */
	commits: number | null;
	pullRequests: number | null;
	lastYear: { total: number; weeks: ContributionDay[][] } | null;
	since: number | null;
	lastUpdated: Date;
}

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

async function request<T>(url: string, init: RequestInit = {}): Promise<T | null> {
	const headers: Record<string, string> = {
		Accept: 'application/vnd.github+json',
		'User-Agent': 'dan3002-portfolio-build',
		'X-GitHub-Api-Version': '2022-11-28',
		...(init.headers as Record<string, string>),
	};
	if (token) headers.Authorization = `Bearer ${token}`;
	try {
		const res = await fetch(url, { ...init, headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
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

async function graphql<T>(query: string, variables: Record<string, unknown> = {}): Promise<T | null> {
	const body = await request<{ data?: T; errors?: { message: string }[] }>('https://api.github.com/graphql', {
		method: 'POST',
		body: JSON.stringify({ query, variables }),
	});
	if (body?.errors?.length) console.warn(`[github] graphql: ${body.errors[0]!.message}`);
	return body?.data ?? null;
}

const LEVEL: Record<string, ContributionDay['level']> = {
	NONE: 0,
	FIRST_QUARTILE: 1,
	SECOND_QUARTILE: 2,
	THIRD_QUARTILE: 3,
	FOURTH_QUARTILE: 4,
};

async function fromGraphql(): Promise<Omit<GithubStats, 'lastUpdated'> | null> {
	type Profile = {
		user: {
			followers: { totalCount: number };
			repositories: { totalCount: number; nodes: { stargazerCount: number }[] };
			contributionsCollection: {
				contributionYears: number[];
				contributionCalendar: {
					totalContributions: number;
					weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[];
				};
			};
		};
	};
	const profile = await graphql<Profile>(
		`query($login: String!) {
			user(login: $login) {
				followers { totalCount }
				repositories(ownerAffiliations: OWNER, privacy: PUBLIC, isFork: false, first: 100) {
					totalCount
					nodes { stargazerCount }
				}
				contributionsCollection {
					contributionYears
					contributionCalendar {
						totalContributions
						weeks { contributionDays { date contributionCount contributionLevel } }
					}
				}
			}
		}`,
		{ login: USER },
	);
	if (!profile?.user) return null;
	const { user } = profile;
	const years = user.contributionsCollection.contributionYears;

	// contributionsCollection spans at most one year, so ask for every year in
	// one request using aliases (y2019: contributionsCollection(from, to) ...).
	const perYear = years
		.map(
			(y) => `y${y}: contributionsCollection(from: "${y}-01-01T00:00:00Z", to: "${y}-12-31T23:59:59Z") {
				totalCommitContributions
				totalPullRequestContributions
				restrictedContributionsCount
				contributionCalendar { totalContributions }
			}`,
		)
		.join('\n');
	type Year = {
		totalCommitContributions: number;
		totalPullRequestContributions: number;
		restrictedContributionsCount: number;
		contributionCalendar: { totalContributions: number };
	};
	const history = await graphql<{ user: Record<string, Year> }>(
		`query($login: String!) { user(login: $login) { ${perYear} } }`,
		{ login: USER },
	);
	const yearly = history?.user ? Object.values(history.user) : null;
	const sum = (pick: (y: Year) => number) => (yearly ? yearly.reduce((n, y) => n + pick(y), 0) : null);

	const cal = user.contributionsCollection.contributionCalendar;
	return {
		source: 'graphql',
		repos: user.repositories.totalCount,
		stars: user.repositories.nodes.reduce((n, r) => n + r.stargazerCount, 0),
		followers: user.followers.totalCount,
		contributions: sum((y) => y.contributionCalendar.totalContributions),
		// Private contributions are reported only as a total, not by type; most of
		// them are commits, so count them with commits to match what visitors see.
		commits: sum((y) => y.totalCommitContributions + y.restrictedContributionsCount),
		pullRequests: sum((y) => y.totalPullRequestContributions),
		lastYear: {
			total: cal.totalContributions,
			weeks: cal.weeks.map((w) =>
				w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: LEVEL[d.contributionLevel] ?? 0 })),
			),
		},
		since: years.length ? Math.min(...years) : null,
	};
}

async function fromRest(): Promise<Omit<GithubStats, 'lastUpdated'>> {
	const [user, repos, commits] = await Promise.all([
		request<{ public_repos: number; followers: number; created_at: string }>(`https://api.github.com/users/${USER}`),
		request<{ stargazers_count: number; fork: boolean }[]>(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner`),
		request<{ total_count: number }>(`https://api.github.com/search/commits?q=author:${USER}&per_page=1`),
	]);
	return {
		source: user ? 'rest' : 'none',
		repos: user?.public_repos ?? null,
		stars: repos ? repos.filter((r) => !r.fork).reduce((n, r) => n + r.stargazers_count, 0) : null,
		followers: user?.followers ?? null,
		contributions: null,
		commits: commits?.total_count ?? null,
		pullRequests: null,
		lastYear: null,
		since: user ? new Date(user.created_at).getFullYear() : null,
	};
}

let cached: Promise<GithubStats> | undefined;

export function getGithubStats(): Promise<GithubStats> {
	cached ??= (async () => {
		const [stats, lastCommit] = await Promise.all([
			(token ? await fromGraphql() : null) ?? fromRest(),
			request<{ commit: { author: { date: string } } }[]>(`https://api.github.com/repos/${REPO}/commits?per_page=1`),
		]);
		if (!token) console.warn('[github] no GITHUB_TOKEN: showing public-only numbers (no contribution graph)');
		console.info(`[github] stats via ${stats.source}: ${stats.contributions ?? '-'} contributions, ${stats.commits ?? '-'} commits`);
		const last = lastCommit?.[0]?.commit.author.date;
		return { ...stats, lastUpdated: last ? new Date(last) : new Date() };
	})();
	return cached;
}

/** 12345 -> "12.3k", 980 -> "980". */
export function compact(n: number): string {
	return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(n).toLowerCase();
}
