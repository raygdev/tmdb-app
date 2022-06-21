import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

let IMG_URL = "https://image.tmdb.org/t/p/w500";

const Genres = (props) => {
  const [moviesFromGenre, setMoviesFromGenre] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState('')
  const { genre_id, genre_name, motion_picture} = useParams();

  useEffect(() => {
      fetch(`/api/genres/?with_genres=${genre_id}&page=${page}&motion_picture=${motion_picture}`,{method: 'POST'})
        .then(res => res.json())
        .then(data => {
          setMoviesFromGenre(data.results)
          setTotalPages(data.total_pages)
        })
      window.scrollTo(0,0)
  }, [page]);

  let pageURL = motion_picture === 'tv' ? 'shows': 'movie'

  const moviesFromGenreList = moviesFromGenre
    ? moviesFromGenre.map((movie) => (
        <div key={movie.id} className='genre-links-container'>
            <Link to={`/${pageURL}/selected/${movie.id}`}><img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} /></Link>
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
      <h1>{genre_name}</h1>
      <div className="buttons-container">
        <button className="cta-btn" onClick={prevPage} disabled={page === 1}>
          PREV
        </button>
        <div>Page {page} of {totalPages}</div>
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
