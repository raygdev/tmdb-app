import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ImageLinkSlider } from "../components/ImageLinkSlider";
import { useLoading } from "../hooks/useLoading";
import { displaySimilarTitles, getGenres, truncate } from "../utils/utils";
import { movieStyles } from "../utils/styles"

let IMG_URL = "https://image.tmdb.org/t/p/w500";
//comments
const Movie = (props) => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [isTruncated, setIsTruncated] = useState("");
  const {
    isLoading,
    setIsLoading,
    loader
  } = useLoading()
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true)
    fetch(`/api/movie/${id}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setMovieDetails(data);
        setIsTruncated(true);
        setIsLoading(false)
      });
  }, [id]);

  let genres = getGenres(movieDetails?.genres)

  const { similar, credits } = movieDetails;

  const similarTitle = displaySimilarTitles(similar?.results, "/movie/selected");

  const cast = displaySimilarTitles(credits?.cast, "/people/selected");

  const crew = displaySimilarTitles(credits?.crew, "/people/selected");

  const releaseDate = new Date(movieDetails.release_date).toLocaleString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
  const truncated = truncate(movieDetails?.overview);

  function toggleTruncated() {
    setIsTruncated((prevTruncated) => !prevTruncated);
  }

  const showButton = isTruncated ? "Show More" : "Show Less";

  return (
   isLoading ? (loader) : (<div>
      <div className="movie-info-container" style={{
        ...movieStyles,
        backgroundImage:`url(${IMG_URL}${movieDetails?.backdrop_path})`,
      }}>
        <div className="movie-info-content">
          <div className="img-col">
            <img
              src={`${IMG_URL}${movieDetails?.poster_path}`}
              alt={movieDetails?.title}
            />
            <p>Released: {releaseDate}</p>
          </div>
          <div className="info-col">
            <h2 className="title">{movieDetails.title}</h2>
            <p>
              {isTruncated ? truncated : movieDetails.overview} <br />
              <span className="show-button" onClick={toggleTruncated}>
                {movieDetails?.overview?.length > 175 && showButton}
              </span>
            </p>
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
    </div>)
  );
};

export default Movie;
