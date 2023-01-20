import PreLoader from './components/utils/PreLoader';
import MobileHeader from './components/header/MobileHeader';
import DesktopHeader from './components/header/DesktopHeader';
import GoToTop from './components/utils/GoToTop';

import Main from './components/Main';

function App() {
	const { PUBLIC_URL } = process.env;

	const script = document.createElement('script');
	script.src = `${PUBLIC_URL}/js/custom.js`;
	script.async = true;
	document.body.appendChild(script);

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
