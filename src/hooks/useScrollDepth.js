import { useEffect } from 'react';
import { track, Events } from '../lib/analytics';

const MILESTONES = [25, 50, 75, 100];

// Fires `scroll-depth` with { percent } at 25/50/75/100% milestones (each once).
export default function useScrollDepth() {
	useEffect(() => {
		if (typeof window === 'undefined') return undefined;

		const fired = new Set();
		let ticking = false;

		const evaluate = () => {
			ticking = false;
			const doc = document.documentElement;
			const scrollTop = window.scrollY || doc.scrollTop || 0;
			const viewport = window.innerHeight || doc.clientHeight || 0;
			const fullHeight = doc.scrollHeight || 0;
			const scrollable = fullHeight - viewport;

			const percent = scrollable <= 0
				? 100
				: Math.min(100, Math.round(((scrollTop + viewport) / fullHeight) * 100));

			MILESTONES.forEach((milestone) => {
				if (percent >= milestone && !fired.has(milestone)) {
					fired.add(milestone);
					track(Events.SCROLL_DEPTH, { percent: milestone });
				}
			});
		};

		const onScroll = () => {
			if (!ticking) {
				ticking = true;
				window.requestAnimationFrame(evaluate);
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		// Evaluate once in case the page is already scrolled / short.
		evaluate();

		return () => window.removeEventListener('scroll', onScroll);
	}, []);
}
