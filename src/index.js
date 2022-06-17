import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import {ContextProvider} from './hooks/ContextProvider'
import ScrollToTop from './components/ScrollToTop'

let KEY = process.env.REACT_APP_API_KEY;

let URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}`;


ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <Router  forceRefresh={true}>
        <ScrollToTop/>
        <App API_KEY={KEY} URL={URL} />
      </Router>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
