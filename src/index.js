import React from "react";
// import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import {ContextProvider} from './hooks/ContextProvider'
import ScrollToTop from './components/ScrollToTop'
import * as ReactDOM from 'react-dom/client'

// let KEY = process.env.REACT_APP_API_KEY;

// let URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}`;
const root =ReactDOM.createRoot( document.getElementById('root')
)
root.render(
    <ContextProvider>
      <Router  forceRefresh={true}>
        <ScrollToTop/>
        <App API_KEY={''} URL={''} />
      </Router>
    </ContextProvider>
  
);


