import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { grey, green } from "@material-ui/core/colors";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import { createStore, applyMiddleware } from "redux";
const store = createStore(reducers, applyMiddleware(reduxThunk));
const theme = createMuiTheme({
  palette: {
    primary: {
      light: grey[300],
      main: grey[800],
      dark: grey[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    type: "dark",
  },
});
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.querySelector("#root")
);
