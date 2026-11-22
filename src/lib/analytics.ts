// Umami wrapper, ported from the old site with the same event names so the
// existing dashboards keep working. Calls made before the tracker script
// loads are queued and flushed once it is ready.

export const Events = {
	NAV: 'nav',
	SECTION_VIEW: 'section-view',
	SCROLL_DEPTH: 'scroll-depth',
	DOWNLOAD_RESUME: 'download-resume',
	OPEN_PROJECT: 'open-project',
	VIEW_PROJECT_SOURCE: 'view-project-source',
	FILTER_TAG: 'filter-tag',
	OPEN_ACHIEVE: 'open-achieve',
	VIEW_ACHIEVE_LINK: 'view-achieve-link',
	VIEW_CERT: 'view-cert',
	CURRENT_WORK_LINK: 'current-work-link',
	VIEW_PROJECT_SITE: 'view-project-site',
	OUTBOUND_LINK: 'outbound-link',
	CONTACT_START: 'contact-start',
	CONTACT_SUBMIT: 'contact-submit',
	CONTACT_SUCCESS: 'contact-success',
	CONTACT_ERROR: 'contact-error',
	THEME_TOGGLE: 'theme-toggle',
	CONTACT_EMAIL: 'contact-email',
	PAGINATE: 'paginate',
	GALLERY_NAV: 'gallery-nav',
	OPEN_MENU: 'open-menu',
} as const;

type EventName = (typeof Events)[keyof typeof Events];
type Payload = Record<string, string | number | boolean>;

const queue: Array<() => void> = [];

export function track(name: EventName, data?: Payload) {
	const send = () => window.umami?.track(name, data);
	if (window.umami) send();
	else if (queue.length < 50) queue.push(send);
}

export function flush() {
	while (queue.length && window.umami) {
		try {
			queue.shift()?.();
		} catch {
			/* analytics must never break the page */
		}
	}
}

/** The link's URL when it points to another site over http(s), else null. */
function externalUrl(el: Element): URL | null {
	if (!(el instanceof HTMLAnchorElement) || !el.href) return null;
	const url = new URL(el.href, location.href);
	return /^https?:$/.test(url.protocol) && url.hostname !== location.hostname ? url : null;
}

/** Sets up all automatic tracking. Call once per page. */
export function initAnalytics() {
	// Declarative tracking: <a data-track="open-project" data-track-title="…">
	document.addEventListener(
		'click',
		(e) => {
			const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track], a[href]');
			if (!el) return;

			const external = externalUrl(el);
			const name = el.dataset.track as EventName | undefined;
			if (name) {
				const payload: Payload = {};
				for (const [k, v] of Object.entries(el.dataset)) {
					if (k.startsWith('track') && k !== 'track' && v) {
						payload[k.slice(5).toLowerCase()] = v;
					}
				}
				if (external) payload.host = external.hostname;
				track(name, Object.keys(payload).length ? payload : undefined);
				// One click = one event: a named link is not also counted as outbound-link.
				return;
			}

			if (external) {
				// Origin + path only: query strings would explode the number of distinct values.
				track(Events.OUTBOUND_LINK, { href: external.origin + external.pathname, host: external.hostname });
			} else if (el instanceof HTMLAnchorElement && el.protocol === 'mailto:') {
				track(Events.CONTACT_EMAIL, { via: 'mailto' });
			}
		},
		true,
	);

	// Section views, once per section. Fires when a section crosses the middle
	// of the viewport, so sections taller than the screen still count on phones.
	const seen = new Set<string>();
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				const { id } = entry.target;
				if (entry.isIntersecting && id && !seen.has(id)) {
					seen.add(id);
					track(Events.SECTION_VIEW, { section: id });
				}
			}
		},
		{ threshold: 0, rootMargin: '-50% 0px -50% 0px' },
	);
	document.querySelectorAll('section[id]').forEach((s) => io.observe(s));

	// Scroll depth milestones.
	const fired = new Set<number>();
	let ticking = false;
	const evaluate = () => {
		ticking = false;
		const doc = document.documentElement;
		const pct = Math.min(100, Math.round(((scrollY + innerHeight) / doc.scrollHeight) * 100));
		for (const m of [25, 50, 75, 100]) {
			if (pct >= m && !fired.has(m)) {
				fired.add(m);
				track(Events.SCROLL_DEPTH, { percent: m });
			}
		}
	};
	addEventListener(
		'scroll',
		() => {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(evaluate);
			}
		},
		{ passive: true },
	);
	// Count milestones already reached on load only when the page opened scrolled
	// (reload, back button, deep link), not just because the screen is tall.
	if (scrollY > 0) evaluate();
}

/** Called when the Umami script loads: send the events queued before it. */
export function onUmamiReady() {
	flush();
}
