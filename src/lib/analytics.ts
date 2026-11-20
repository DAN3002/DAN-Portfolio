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
	OUTBOUND_LINK: 'outbound-link',
	CONTACT_START: 'contact-start',
	CONTACT_SUBMIT: 'contact-submit',
	CONTACT_SUCCESS: 'contact-success',
	CONTACT_ERROR: 'contact-error',
	THEME_TOGGLE: 'theme-toggle',
} as const;

type EventName = (typeof Events)[keyof typeof Events];
type Payload = Record<string, string | number | boolean>;

const queue: Array<() => void> = [];

export function track(name: EventName, data?: Payload) {
	const send = () => window.umami?.track(name, data);
	if (window.umami) send();
	else queue.push(send);
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

/** Sets up all automatic tracking. Call once per page. */
export function initAnalytics() {
	// Declarative tracking: <a data-track="open-project" data-track-title="…">
	document.addEventListener(
		'click',
		(e) => {
			const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track], a[href]');
			if (!el) return;

			const name = el.dataset.track as EventName | undefined;
			if (name) {
				const payload: Payload = {};
				for (const [k, v] of Object.entries(el.dataset)) {
					if (k.startsWith('track') && k !== 'track' && v) {
						payload[k.slice(5).toLowerCase()] = v;
					}
				}
				track(name, Object.keys(payload).length ? payload : undefined);
			}

			if (el instanceof HTMLAnchorElement && el.href) {
				const url = new URL(el.href, location.href);
				if (/^https?:$/.test(url.protocol) && url.hostname !== location.hostname) {
					track(Events.OUTBOUND_LINK, { href: url.href, host: url.hostname });
				}
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
	// Count milestones already reached on load (reload, back button, deep link).
	evaluate();
}

const VISITOR_KEY = 'dan_visitor_id';

/** Anonymous random id (no PII), kept in localStorage, same key as the old site. */
function visitorId(): string {
	try {
		let id = localStorage.getItem(VISITOR_KEY);
		if (!id) {
			id = crypto.randomUUID();
			localStorage.setItem(VISITOR_KEY, id);
		}
		return id;
	} catch {
		return crypto.randomUUID();
	}
}

/** Called when the Umami script loads: tag the visitor, then send queued events. */
export function onUmamiReady() {
	try {
		window.umami?.identify?.({ id: visitorId() });
	} catch {
		/* ignore */
	}
	flush();
}
