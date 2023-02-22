import React from "react";
// import ReactDOM from "react-dom";
import "./css/index.css"

import App from "./App"
import { BrowserRouter as Router } from "react-router-dom";
import { ContextProvider } from "./hooks/ContextProvider";
import ScrollToTop from "./components/ScrollToTop";
import * as ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<React.StrictMode>
  <ContextProvider>
    <Router forceRefresh={true}>
      <ScrollToTop />
      <App />
    </Router>
  </ContextProvider>
</React.StrictMode>
);
