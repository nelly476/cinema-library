import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import configurationReducer from "./configurationSlice";
import moviesReducer from "./moviesSlice";
import actorsReducer from "./actorsSlice";

const store = configureStore({
  reducer: {
    configuration: configurationReducer,
    movies: moviesReducer,
    actors: actorsReducer,
  },
  middleware: [thunk],
});

export default store;
