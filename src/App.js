import React from "react";
import { Header } from "./components/Header";
import { Switch, Route } from "react-router-dom";
import { WatchList } from "./pages/WatchList";
const Movie = React.lazy(() => import("./pages/Movie"));
const Home = React.lazy(() => import("./pages/Home"));
const Genres = React.lazy(() => import("./pages/Genres"));
const Shows = React.lazy(() => import("./pages/Shows"));
function App({ URL, API_KEY }) {
  console.log("app rendered");
  return (
    <div className="App">
      <Header />
      <React.Suspense fallback={<div className="loader"></div>}>
      <Switch>
        <Route exact path="/" render={() => <Home URL={URL} />} />
        <Route path="/watchlist" children={<WatchList />} />
        <Route
          path="/movie/selected/:id"
          render={() => <Movie API_KEY={API_KEY} />}
        />
        <Route
          path="/genres/:genre_id"
          render={() => <Genres API_KEY={API_KEY} />}
        />
        <Route path="/shows/selected/:show_id" render={() => <Shows />} />
      </Switch>
      </React.Suspense>
    </div>
  );
}

export default App;
