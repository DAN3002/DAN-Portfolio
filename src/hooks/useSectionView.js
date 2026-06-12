import { useEffect } from 'react';
import { track, Events } from '../lib/analytics';

// Tracks the first time each <section id="..."> scrolls into view.
// Fires `section-view` with { section } once per section per page load.
export default function useSectionView() {
	useEffect(() => {
		if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
			return undefined;
		}

		const sections = Array.from(document.querySelectorAll('section[id]'));
		if (sections.length === 0) return undefined;

		const seen = new Set();

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const { id } = entry.target;
					if (entry.isIntersecting && id && !seen.has(id)) {
						seen.add(id);
						track(Events.SECTION_VIEW, { section: id });
					}
				});
			},
			{ threshold: 0.4 },
		);

		sections.forEach((section) => observer.observe(section));

		return () => observer.disconnect();
	}, []);
}
