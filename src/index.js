import "react-app-polyfill/ie11"; // For IE 11 support
import "babel-polyfill"; //to make react work with ie11 (mostly)
import React from "react";
import ReactDOM from "react-dom";
import { StyleRoot } from "radium";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <StyleRoot>
    <App />
  </StyleRoot>,
  document.getElementById("root")
);
registerServiceWorker();
