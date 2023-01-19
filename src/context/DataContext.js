/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
	data: {},
	setData: () => {},
};

export const DataContext = createContext(INITIAL_STATE);

export function DataContextProvider({ children }) {
	const [data, setData] = useState({});

	return (
		<DataContext.Provider
			value={{
				data,
				setData,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}

DataContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
