import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "327ddeac79bb24b66e1a04c51649ce6d";

const initialState = {
  config: {},
  status: "idle",
  error: null,
};

export const fetchConfiguration = createAsyncThunk(
  "configuration/fetchConfig",
  async () => {
    const response = await fetch(
      `${TMDB_BASE_URL}/configuration?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
);

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    // define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfiguration.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConfiguration.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.config = action.payload;
      })
      .addCase(fetchConfiguration.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default configurationSlice.reducer;
