import React, { useEffect } from 'react';
import AppRouter from './AppRouter';
import { fetchConfiguration } from './ConfigurationResponce.js';
import { useAppDispatch } from './hooks';
import Header from './components/Header.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchConfiguration());
	}, [dispatch]);

	return (
		<Router>
			<Header/>
			<AppRouter />
		</Router>
	);
};

export default App;
