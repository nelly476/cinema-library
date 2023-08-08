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
  async (page = 1) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
);

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopular",
  async (page = 1) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
);

export const fetchRecentMovies = createAsyncThunk(
  "movies/fetchRecent",
  async (page = 1) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
);

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async ({ query, page = 1 }) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
);

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
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.results;
      })
      .addCase(fetchRecentMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.results;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.results;
      });
    //more cases if additional thunks
  },
});

export default moviesSlice.reducer;
