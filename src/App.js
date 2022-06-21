import React from "react";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { WatchList } from "./pages/WatchList";
const Movie = React.lazy(() => import("./pages/Movie"));
const Home = React.lazy(() => import("./pages/Home"));
const Genres = React.lazy(() => import("./pages/Genres"));
const Shows = React.lazy(() => import("./pages/Shows"));
function App({ URL, API_KEY }) {

  return (
    <div className="App">
      <Header />
      <React.Suspense fallback={<div className="loader"></div>}>
      <Routes>
        <Route path="/" element={ <Home  />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route
          path="/movie/selected/:id"
          element={ <Movie />}
        />
        <Route
          path="/genres/:genre_id/:genre_name/:motion_picture"
          element={ <Genres />}
        />
        <Route path="/shows/selected/:show_id" element={ <Shows />} />
      </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
