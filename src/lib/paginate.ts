// Client-side pagination for a server-rendered list.
//
// Markup: <ul data-paginate="<id>" data-page-size="6"> with <li> children,
// plus a <nav data-pager="<id>"> rendered by Pagination.astro. Without JS
// every item stays visible. Filters mark items with data-filtered-out and
// call refresh(), which resets to page 1.

export interface Pager {
	refresh: () => void;
}

const pagers = new Map<string, Pager>();

export function getPager(id: string): Pager | undefined {
	return pagers.get(id);
}

export function initPagination() {
	document.querySelectorAll<HTMLElement>('[data-paginate]').forEach((list) => {
		const id = list.dataset.paginate!;
		const size = Number(list.dataset.pageSize) || 6;
		const nav = document.querySelector<HTMLElement>(`[data-pager="${id}"]`);
		if (!nav) return;

		const prev = nav.querySelector<HTMLButtonElement>('[data-pager-prev]')!;
		const next = nav.querySelector<HTMLButtonElement>('[data-pager-next]')!;
		const pages = nav.querySelector<HTMLElement>('[data-pager-pages]')!;
		const status = nav.querySelector<HTMLElement>('[data-pager-status]')!;
		const noun = nav.dataset.noun ?? 'items';
		let page = 1;

		const items = () => [...list.children] as HTMLElement[];
		const visible = () => items().filter((li) => !li.hasAttribute('data-filtered-out'));

		const render = (scroll = false) => {
			const pool = visible();
			const total = Math.max(1, Math.ceil(pool.length / size));
			page = Math.min(Math.max(1, page), total);
			const start = (page - 1) * size;

			items().forEach((li) => (li.hidden = true));
			pool.slice(start, start + size).forEach((li) => (li.hidden = false));

			nav.hidden = pool.length <= size;
			prev.disabled = page === 1;
			next.disabled = page === total;
			const end = Math.min(start + size, pool.length);
			const range = end === start + 1 ? String(end) : `${start + 1}–${end}`;
			status.textContent = pool.length ? `Showing ${range} of ${pool.length} ${noun}` : '';

			pages.replaceChildren(
				...Array.from({ length: total }, (_, i) => {
					const b = document.createElement('button');
					b.type = 'button';
					b.className = 'pager-btn';
					b.textContent = String(i + 1);
					b.setAttribute('aria-label', `Page ${i + 1}`);
					if (i + 1 === page) b.setAttribute('aria-current', 'page');
					b.addEventListener('click', () => go(i + 1));
					return b;
				}),
			);

			// Bring the list back into view when its top has scrolled away,
			// so the next page doesn't start somewhere off screen.
			if (scroll && list.getBoundingClientRect().top < 0) {
				list.scrollIntoView({ block: 'start' });
			}
		};

		const go = (p: number) => {
			page = p;
			render(true);
		};

		prev.addEventListener('click', () => go(page - 1));
		next.addEventListener('click', () => go(page + 1));

		pagers.set(id, {
			refresh: () => {
				page = 1;
				render();
			},
		});
		render();
	});
}
