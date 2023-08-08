import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "327ddeac79bb24b66e1a04c51649ce6d";

const initialState = {
  actors: [],
  currentActor: null,
  status: "idle",
  error: null,
};

export const fetchPopularActors = createAsyncThunk(
  "actors/fetchPopular",
  async (page = 1) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/person/popular?api_key=${API_KEY}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
);

export const fetchActorDetails = createAsyncThunk(
  "actors/fetchActorDetails",
  async (actorId) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/person/${actorId}?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
);

export const searchActors = createAsyncThunk(
  "actors/searchActors",
  async ({ query, page = 1 }) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/person?query=${query}&api_key=${API_KEY}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
);

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
        state.actors = action.payload.results;
      })
      .addCase(fetchPopularActors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchActorDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchActorDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentActor = action.payload;
      })
      .addCase(fetchActorDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchActors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchActors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.actors = action.payload.results; // Update actors list based on search results
      })
      .addCase(searchActors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default actorsSlice.reducer;
