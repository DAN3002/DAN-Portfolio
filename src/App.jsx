import React, { useEffect } from 'react';

import PreLoader from './components/utils/PreLoader';
import MobileHeader from './components/header/MobileHeader';
import DesktopHeader from './components/header/DesktopHeader';
import GoToTop from './components/utils/GoToTop';

import Main from './components/Main';

import { onUmamiReady, identify } from './lib/analytics';
import getVisitorId from './lib/visitor';
import useSectionView from './hooks/useSectionView';
import useScrollDepth from './hooks/useScrollDepth';
import useOutboundLinks from './hooks/useOutboundLinks';

import 'react-lazy-load-image-component/src/effects/blur.css';
import './styles/components/lazy-image.css';

function App() {
	const { PUBLIC_URL } = process.env;

	// Automatic Umami tracking: section views, scroll depth, outbound links.
	useSectionView();
	useScrollDepth();
	useOutboundLinks();

	useEffect(() => {
		const script = document.createElement('script');
		script.src = `${PUBLIC_URL}/js/custom.js`;
		script.async = true;
		document.body.appendChild(script);

		// Handle section query parameter for scrolling
		const handleSectionScroll = () => {
			const urlParams = new URLSearchParams(window.location.search);
			const sectionParam = urlParams.get('section');

			if (sectionParam) {
				// Wait for DOM to be fully loaded and preloader to finish
				setTimeout(() => {
					const sectionElement = document.getElementById(sectionParam);
					if (sectionElement) {
						// Use the same animation as in custom.js
						$('html, body').animate({
							scrollTop: $(sectionElement).offset().top - 100,
						}, 800, 'easeInOutQuad');
					}
				}, 1500); // Give more time for preloader to finish and components to render
			}
		};

		// Run after the custom.js script has loaded
		window.addEventListener('load', handleSectionScroll);
		return () => window.removeEventListener('load', handleSectionScroll);
	}, [PUBLIC_URL]);

	useEffect(() => {
		const websiteId = process.env.REACT_APP_UMAMI_WEBSITE_ID;
		if (websiteId) {
			const umamiScript = document.createElement('script');
			umamiScript.src = 'https://cloud.umami.is/script.js';
			umamiScript.async = true;
			umamiScript.defer = true;
			// Set the data-website-id attribute expected by Umami
			umamiScript.dataset.websiteId = websiteId;
			// Best-practice tracker configuration.
			umamiScript.dataset.tag = 'portfolio';
			umamiScript.dataset.doNotTrack = 'true';
			umamiScript.dataset.excludeHash = 'true';
			// Drain queued events and assign an anonymous Distinct ID once ready.
			umamiScript.onload = () => {
				onUmamiReady();
				identify(getVisitorId());
			};
			document.body.appendChild(umamiScript);
		}
	}, []);

	return (
		<>
			<PreLoader />
			<MobileHeader />
			<DesktopHeader />
			<Main />
			<GoToTop />
		</>
	);
}

export default App;
