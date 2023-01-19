import React, { useEffect, useContext } from 'react';

import PreLoader from './components/utils/PreLoader';
import MobileHeader from './components/header/MobileHeader';
import DesktopHeader from './components/header/DesktopHeader';
import GoToTop from './components/utils/GoToTop';
import { DataContext } from './context/DataContext';

import Main from './components/Main';

const DATA_URL = 'https://raw.githubusercontent.com/DAN3002/DAN-Portfolio/main/data/data.json?token=GHSAT0AAAAAAB5UVHAFK32Z743W27JU26TMY6JHZ7A';

function App() {
	const { PUBLIC_URL } = process.env;

	const { setData } = useContext(DataContext);

	useEffect(() => {
		// Inject custom script to the DOM
		const script = document.createElement('script');
		script.src = `${PUBLIC_URL}/js/custom.js`;
		script.async = true;
		document.body.appendChild(script);

		// fetch json data
		fetch(DATA_URL)
			.then((response) => response.json())
			.then((data) => {
				setData(data);
			});
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
