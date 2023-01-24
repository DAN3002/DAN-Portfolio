import ReactGA from 'react-ga';

const useAnalyticsEventTracker = () => {
	const eventTracker = (action = 'test action', label = 'test label') => {
		ReactGA.event({
			category: 'D.A.N_3002 Portfolio',
			action,
			label,
		});
	};
	return eventTracker;
};
export default useAnalyticsEventTracker;
