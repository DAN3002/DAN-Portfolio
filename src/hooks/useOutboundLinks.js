import { useEffect } from 'react';
import { track, Events } from '../lib/analytics';

// Delegated click listener that fires `outbound-link` with { href, host }
// whenever a link to an external host is clicked.
export default function useOutboundLinks() {
	useEffect(() => {
		if (typeof window === 'undefined') return undefined;

		const onClick = (event) => {
			const anchor = event.target.closest && event.target.closest('a[href]');
			if (!anchor) return;

			const href = anchor.getAttribute('href');
			if (!href) return;

			// Ignore in-page, mailto, tel and javascript: links.
			if (/^(#|mailto:|tel:|javascript:)/i.test(href)) return;

			let url;
			try {
				url = new URL(href, window.location.href);
			} catch {
				return;
			}

			if (!/^https?:$/.test(url.protocol)) return;
			if (url.hostname === window.location.hostname) return;

			track(Events.OUTBOUND_LINK, { href: url.href, host: url.hostname });
		};

		document.addEventListener('click', onClick, true);
		return () => document.removeEventListener('click', onClick, true);
	}, []);
}
