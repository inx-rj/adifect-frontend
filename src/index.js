import "./assets/css/tailwind.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import App from "./App";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import { HelmetProvider } from "react-helmet-async";
// import '../../../utils/fbSDKInit';

window.Buffer = window.Buffer || require("buffer").Buffer;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
