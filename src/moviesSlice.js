import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "327ddeac79bb24b66e1a04c51649ce6d";

const initialState = {
  movies: [],
  currentMovie: null,
  status: "idle",
  error: null,
  movieDetailsStatus: "idle",
  movieDetailsError: null,
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

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (movieId) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
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
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.movieDetailsStatus = "loading";
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetailsStatus = "succeeded";
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.movieDetailsStatus = "failed";
        state.movieDetailsError = action.error.message;
      });
  },
});

// In your slice or a separate selectors file
export const selectCurrentMovie = (state) => state.movies.currentMovie;
export const selectMovieDetailsStatus = (state) =>
  state.movies.movieDetailsStatus;
export const selectMovieDetailsError = (state) =>
  state.movies.movieDetailsError;

export default moviesSlice.reducer;
