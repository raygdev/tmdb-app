import {  Link } from "react-router-dom";
import { noPhotoUrl, imageSource } from "../utils/utils";
import { useGenres } from "../hooks/useGenres";

const Genres = (props) => {
  const {
    moviesFromGenre,
    page,
    setPage,
    setIsLoading,
    totalPages,
    isLoading,
    loader,
    motion_picture,
    genre_name
  } = useGenres()

  let pageURL = motion_picture === "tv" ? "shows" : "movie";

  if(isLoading) return loader

  const moviesFromGenreList = moviesFromGenre.map((movie) => {
      let url = movie.poster_path ? (imageSource + movie.poster_path) : noPhotoUrl
      return (
        <div key={movie.id} className="genre-links-container">
          <Link to={`/${pageURL}/selected/${movie.id}`}>
            <figure>
              <img src={url} alt={movie.title || movie.name} />
              <figcaption 
                data-tool-tip={movie.title || movie.name}
                className="name-truncate"
              >
                {movie.title || movie.name}
              </figcaption>
            </figure>
          </Link>
        </div>
      )
  })

  function prevPage() {
    setIsLoading(true)
    setPage((prevPage) => prevPage - 1);
  }

  function nextPage() {
    setIsLoading(true)
    setPage((nextPage) => nextPage + 1);
  }

  return (
    <div className="genre-page-container">
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
    </div>
  );
};
export default Genres;
