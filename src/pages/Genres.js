import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

let BASE_MOVIE_LIST_URL = `https://api.themoviedb.org/3/discover/movie?api_key=`;
let IMG_URL = "https://image.tmdb.org/t/p/w500";

const Genres = (props) => {
  const [moviesFromGenre, setMoviesFromGenre] = useState("");
  const [page, setPage] = useState(1);
  const { genre_id } = useParams();

  useEffect(() => {
    fetch(
      `${BASE_MOVIE_LIST_URL}${process.env.REACT_APP_API_KEY}&with_genres=${genre_id}&page=${page}&list`
    )
      .then((res) => res.json())
      .then((data) => {
        return setMoviesFromGenre(data.results);
      });
      window.scrollTo(0,0)
  }, [page]);

  const moviesFromGenreList = moviesFromGenre
    ? moviesFromGenre.map((movie) => (
        <div key={movie.id} className='genre-links-container'>
            <Link to={`/movie/selected/${movie.id}`}><img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} /></Link>
        </div>
      ))
    : null;

  function prevPage() {
    setPage((prevPage) => prevPage - 1);
  }

  function nextPage() {
    setPage((nextPage) => nextPage + 1);
  }

  return (
    <div className="genre-page-container">
      <h1>Genres</h1>
      <div className="buttons-container">
        <button className="cta-btn" onClick={prevPage} disabled={page === 1}>
          PREV
        </button>
        <div>{page}</div>
        <button className="cta-btn" onClick={nextPage}>
          NEXT
        </button>
      </div>
      <div className="genre-movies">
      {moviesFromGenreList}
      </div>
      <div className="buttons-container">
        <button className="cta-btn" onClick={prevPage} disabled={page === 1}>
          PREV
        </button>
        <div>{page}</div>
        <button className="cta-btn" onClick={nextPage}>
          NEXT
        </button>
      </div>
    </div>
  );
};
export default Genres;
