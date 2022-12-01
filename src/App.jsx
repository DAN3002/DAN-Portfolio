import React, { useEffect } from 'react';

import PreLoader from './components/utils/PreLoader';
import MobileHeader from './components/header/MobileHeader';
import DesktopHeader from './components/header/DesktopHeader';

import Main from './components/Main';

function App() {
	const { PUBLIC_URL } = process.env;

	useEffect(() => {
		// Inject custom script to the DOM
		const script = document.createElement('script');
		script.src = `${PUBLIC_URL}/js/custom.js`;
		script.async = true;
		document.body.appendChild(script);
	}, []);

	return (
		<>
			<PreLoader />
			<MobileHeader />
			<DesktopHeader />
			<Main />
		</>
	);
}

export default App;
