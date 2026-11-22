// Tiny and dependency-free so it can run both at build time and in the browser.

/** Whole years from `start` to `now`, counting a year only once its anniversary has passed. */
export function yearsSince(start: Date, now = new Date()): number {
	let years = now.getFullYear() - start.getFullYear();
	const before = now.getMonth() < start.getMonth() || (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());
	if (before) years -= 1;
	return Math.max(0, years);
}

export const pluralYears = (n: number) => `${n} ${n === 1 ? 'year' : 'years'}`;

/**
 * Re-computes every `<span data-years-since="YYYY-MM-DD">` in the page, so the
 * number is correct on the day a visitor reads it, not the day the site was built.
 * The server-rendered text stays as the no-JS fallback.
 */
export function hydrateYears(root: ParentNode = document) {
	root.querySelectorAll<HTMLElement>('[data-years-since]').forEach((el) => {
		const start = new Date(`${el.dataset.yearsSince}T00:00:00`);
		if (Number.isNaN(start.getTime())) return;
		el.textContent = pluralYears(yearsSince(start));
	});
}
