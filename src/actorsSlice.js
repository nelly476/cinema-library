import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "327ddeac79bb24b66e1a04c51649ce6d";

const initialState = {
  actors: [],
  status: "idle",
  error: null,
};

export const fetchPopularActors = createAsyncThunk(
  "actors/fetchPopular",
  async () => {
    const response = await fetch(
      `${TMDB_BASE_URL}/person/popular?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
);

// ... add more thunks for other actor-related data ...

const actorsSlice = createSlice({
  name: "actors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularActors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularActors.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add the fetched actors to the state array
        state.actors = action.payload.results;
      })
      .addCase(fetchPopularActors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // Handle other thunk cases if more thunks
  },
});

export default actorsSlice.reducer;
