import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useLoading } from "../hooks/useLoading/useLoading";
import { API_URL } from "../utils/apiUrl";
import { noPhotoUrl, imageSource } from "../utils/utils";

let IMG_URL = "https://image.tmdb.org/t/p/w500";

const Genres = (props) => {
  const [moviesFromGenre, setMoviesFromGenre] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const {
    isLoading,
    setIsLoading,
    loader
  } = useLoading()
  const { genre_id, genre_name, motion_picture } = useParams();

  useEffect(() => {
    setIsLoading(true)
    fetch(
      `${API_URL}/api/genres/?with_genres=${genre_id}&page=${page}&motion_picture=${motion_picture}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMoviesFromGenre(data.results);
        setTotalPages(data.total_pages);
        setIsLoading(false)
      }).catch(e => console.log(e));
    window.scrollTo(0, 0);
  }, [page]);

  let pageURL = motion_picture === "tv" ? "shows" : "movie";

  const moviesFromGenreList = moviesFromGenre
    ? moviesFromGenre.map((movie) => {
      let url = movie.poster_path ? (imageSource + movie.poster_path) : noPhotoUrl
      return (
        <div key={movie.id} className="genre-links-container">
          <Link to={`/${pageURL}/selected/${movie.id}`}>
            <figure>
              <img src={url} alt={movie.title} />
              <figcaption 
                data-tool-tip={movie.title}
                className="name-truncate"
              >
                {movie.title}
              </figcaption>
            </figure>
          </Link>
        </div>
      )
       })
    : null;

  function prevPage() {
    setIsLoading(true)
    setPage((prevPage) => prevPage - 1);
  }

  function nextPage() {
    setIsLoading(true)
    setPage((nextPage) => nextPage + 1);
  }

  return (
    isLoading ? (loader) : (<div className="genre-page-container">
      <h1>{genre_name}</h1>
      <div className="buttons-container">
        <button className="cta-btn" onClick={prevPage} disabled={page === 1}>
          PREV
        </button>
        <div>
          Page {page} of {totalPages}
        </div>
        <button className="cta-btn" onClick={nextPage}>
          NEXT
        </button>
      </div>
      <div className="genre-movies">{moviesFromGenreList}</div>
      <div className="buttons-container">
        <button className="cta-btn" onClick={prevPage} disabled={page === 1}>
          PREV
        </button>
        <div>{page}</div>
        <button className="cta-btn" onClick={nextPage}>
          NEXT
        </button>
      </div>
    </div>)
  );
};
export default Genres;
