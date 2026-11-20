// Build-time side of the GitHub card. Node only (uses fs), never imported by
// client scripts.
//
// A build can be rate-limited (GitHub allows 60 keyless REST calls per hour per
// IP, and CI runners share IPs). So the last good result is committed in
// src/data/github-snapshot.json: every field the live fetch misses falls back to
// it, and a fully successful fetch refreshes the file for the next build.

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fetchGithubStats, isGithubStats, mergeStats, type GithubStats } from './github';

// Resolved from the project root (where astro runs), not import.meta.url:
// at build time this module is bundled into dist/, so relative URLs break.
const SNAPSHOT = resolve(process.cwd(), 'src/data/github-snapshot.json');
const REPO = 'DAN3002/DAN-Portfolio';

function readSnapshot(): GithubStats | null {
	try {
		const data: unknown = JSON.parse(readFileSync(SNAPSHOT, 'utf8'));
		return isGithubStats(data) ? data : null;
	} catch {
		return null;
	}
}

let cache: Promise<GithubStats | null> | undefined;

/** Fetched once per build and shared by every component. Null only if nothing ever worked. */
export function getGithubStats(): Promise<GithubStats | null> {
	cache ??= (async () => {
		const fresh = await fetchGithubStats();
		const saved = readSnapshot();
		const complete = Object.values(fresh).every((v) => v !== null);
		if (complete) {
			try {
				writeFileSync(SNAPSHOT, `${JSON.stringify(fresh, null, '\t')}\n`);
			} catch {
				/* read-only checkout: fine, the page still uses the fresh data */
			}
		}
		const stats = saved ? mergeStats(saved, fresh) : fresh;
		console.info(
			`[github] ${complete ? 'fresh' : saved ? 'partial, filled from snapshot' : 'partial, no snapshot'}: ` +
				`${stats.contributions ?? '-'} contributions, ${stats.commits ?? '-'} public commits`,
		);
		return stats.contributions === null && stats.repos === null ? null : stats;
	})();
	return cache;
}

/** Date of the last commit to this site's repo, or null if GitHub is unreachable. */
export async function getLastUpdated(): Promise<Date | null> {
	try {
		const res = await fetch(`https://api.github.com/repos/${REPO}/commits?per_page=1`, { signal: AbortSignal.timeout(10_000) });
		if (!res.ok) return null;
		const [last] = (await res.json()) as { commit: { author: { date: string } } }[];
		return last ? new Date(last.commit.author.date) : null;
	} catch {
		return null;
	}
}
