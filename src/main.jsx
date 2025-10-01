import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/app/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="baniya-di-hatti">
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
