import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

import { createRoot } from "react-dom/client";
import App from "./App";

const root = document.getElementById("root");
const appRoot = createRoot(root);
appRoot.render(
  <Provider store={store}>
    <App />
  </Provider>
);
