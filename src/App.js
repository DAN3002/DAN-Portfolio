import React from 'react';

import PreLoader from './components/PreLoader';
import MobileHeader from './components/header/MobileHeader';
import DesktopHeader from './components/header/DesktopHeader';

function App() {
	return (
		<React.Fragment>
			<PreLoader />
			<MobileHeader />
			<DesktopHeader />
		</React.Fragment>
	);
}

export default App;
