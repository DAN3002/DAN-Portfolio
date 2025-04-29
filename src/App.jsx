import React, { useEffect } from 'react';
// import ReactGA from 'react-ga4';

import PreLoader from './components/utils/PreLoader';
import MobileHeader from './components/header/MobileHeader';
import DesktopHeader from './components/header/DesktopHeader';
import GoToTop from './components/utils/GoToTop';

import Main from './components/Main';

import 'react-lazy-load-image-component/src/effects/blur.css';
import './styles/components/lazy-image.css';

// const TRACKING_ID = 'G-44EFKEN67K';
// ReactGA.initialize(TRACKING_ID);

function App() {
	const { PUBLIC_URL } = process.env;

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
							scrollTop: $(sectionElement).offset().top,
						}, 800, 'easeInOutQuad');
					}
				}, 1000); // Give time for preloader to finish
			}
		};

		// Run after the custom.js script has loaded
		window.addEventListener('load', handleSectionScroll);
		return () => window.removeEventListener('load', handleSectionScroll);
	}, [PUBLIC_URL]);

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
