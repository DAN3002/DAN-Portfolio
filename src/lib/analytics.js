// Centralized Umami analytics helper.
// Wraps all window.umami calls, buffering them until the tracker script is ready.

const QUEUE = [];

function flush() {
	if (typeof window === 'undefined' || !window.umami) return;
	while (QUEUE.length) {
		const fn = QUEUE.shift();
		try {
			fn();
		} catch {
			/* noop */
		}
	}
}

function whenReady(fn) {
	if (typeof window !== 'undefined' && window.umami) fn();
	else QUEUE.push(fn);
}

export function track(name, data) {
	whenReady(() => (data ? window.umami.track(name, data) : window.umami.track(name)));
}

export function identify(id, data) {
	whenReady(() => window.umami.identify(data ? { id, ...data } : { id }));
}

// Call once umami loads (from App.jsx onload) to drain queued calls.
export function onUmamiReady() {
	flush();
}

export const Events = {
	NAV: 'nav', // data: { section }
	SECTION_VIEW: 'section-view',
	SCROLL_DEPTH: 'scroll-depth',
	DOWNLOAD_RESUME: 'download-resume',
	OPEN_PROJECT: 'open-project',
	VIEW_PROJECT_SOURCE: 'view-project-source',
	FILTER_TAG: 'filter-tag',
	OPEN_CERT: 'open-cert',
	VIEW_CERT: 'view-cert',
	OPEN_ACHIEVE: 'open-achieve',
	VIEW_ACHIEVE_LINK: 'view-achieve-link',
	CURRENT_WORK_LINK: 'current-work-link',
	OUTBOUND_LINK: 'outbound-link',
	CONTACT_START: 'contact-start',
	CONTACT_SUBMIT: 'contact-submit',
	CONTACT_SUCCESS: 'contact-success',
	CONTACT_ERROR: 'contact-error',
};
