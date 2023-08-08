import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchConfiguration = createAsyncThunk(
	'config/fetch',
	async () => {
		const options = {method: 'GET', headers: {accept: 'application/json'}};
		const API_KEY = '1be89c2842652e93de9677919b38d97e';

		const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`, options);
		const data = await response.json();

		console.log(data);
		return data;
	}
);
