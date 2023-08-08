import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "327ddeac79bb24b66e1a04c51649ce6d";

const initialState = {
  movies: [],
  status: "idle",
  error: null,
};

export const fetchTopRatedMovies = createAsyncThunk(
  "movies/fetchTopRated",
  async () => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/top_rated?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
);

// ... add more thunks for other filters (e.g., popular, recent) ...

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.movies = action.payload.results;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // Handle other thunk cases if more thunks
  },
});

export default moviesSlice.reducer;
