import React from 'react';

import PreLoader from './components/PreLoader';
import MobileHeader from './components/header/MobileHeader';
import DesktopHeader from './components/header/DesktopHeader';

import Main from './components/Main';

function App() {
	return (
		<React.Fragment>
			<PreLoader />
			<MobileHeader />
			<DesktopHeader />
			<Main />
		</React.Fragment>
	);
}

export default App;
