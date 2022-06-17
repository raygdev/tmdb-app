import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ImageLinkSlider } from "../components/ImageLinkSlider";
import { getTitles, displaySimilarTitles, initMovieState } from "../utils";

let IMG_URL = "https://image.tmdb.org/t/p/w500";
const Movie = (props) => {
  const [movieDetails, setMovieDetails] = useState(initMovieState);
  const { id } = useParams();

  useEffect(() => {
    getTitles(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,similar,credits`,
      (data) => {
        setMovieDetails(data);
      }
    );
  }, [id]);

  console.log("movie rendered");

  let genres = movieDetails.genres.map((genre, i) => {
    return (
      <p className={`genres${i} genre`} key={genre.id}>
        {<Link to={`/genres/${genre.id}`}>{genre.name}</Link>}
      </p>
    );
  });

  const { similar, credits } = movieDetails;

  const similarTitle = displaySimilarTitles(similar.results, "/movie/selected");

  const cast = displaySimilarTitles(credits.cast, "/people/selected");

  const crew = displaySimilarTitles(credits.crew, "/people/selected");

  const styles = {
    backgroundColor: "rgba(0,0,0,0.8)",
    backgroundImage:
      movieDetails.backdrop_path &&
      `url(${IMG_URL}${movieDetails.backdrop_path})`,
    backgroundBlendMode: "multiply",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "white",
    border: "2px solid white",
  };
  const releaseDate = new Date(movieDetails.release_date).toLocaleString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
  const truncated =
    movieDetails.overview.length >= 175
      ? movieDetails.overview.slice(0, 175).trim().concat(`...`)
      : movieDetails.overview;

  
  return (
    <div>
      <div className="movie-info-container" style={styles}>
        <div className="movie-info-content">
          <div className="img-col">
            <img
              src={
                movieDetails.poster_path &&
                `${IMG_URL}${movieDetails.poster_path}`
              }
              alt=""
            />
            <p>Released: {releaseDate}</p>
          </div>
          <div className="info-col">
            <h2 className="title">{movieDetails.title}</h2>
            <p>{truncated}</p>
            <div className="sub-info">
              <p className="released">Released: {releaseDate}</p>
              <p>Runtime: {movieDetails.runtime} minutes</p>
            </div>
          </div>
        </div>
      </div>
      <div className="genre-col">
        <h3>Genres:({genres ? genres.length : null})</h3>
        <div className="genres-container">{genres}</div>
      </div>
      <div className="related-titles-col">
        <ImageLinkSlider
          images={similarTitle}
          name={`Titles Related to ${movieDetails.title}`}
        />
        <ImageLinkSlider images={cast} name="Cast" />
        <ImageLinkSlider images={crew} name="Crew" />
      </div>
    </div>
  );
};

export default Movie;
