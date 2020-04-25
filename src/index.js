import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import {BrowserRouter as Router} from 'react-router-dom';
ReactDOM.render(<Router basename="/daily-challenge"><App /></Router>, document.getElementById("root"));
registerServiceWorker();
