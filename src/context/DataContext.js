/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
	data: {},
};

export const DataContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
	switch (action.type) {
	case 'UPDATE_DATA':
		return {
			data: action.payload,
		};
	default:
		return state;
	}
};

export function DataContextProvider({ children }) {
	const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

	return (
		<DataContext.Provider
			value={{
				data: state.data,
				dispatch,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}

DataContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
