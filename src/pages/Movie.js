import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ImageLinkSlider } from "../components/ImageLinkSlider";
import { displaySimilarTitles, initMovieState } from "../utils";

let IMG_URL = "https://image.tmdb.org/t/p/w500";

const Movie = (props) => {
  const [movieDetails, setMovieDetails] = useState(initMovieState);
  const [isTruncated, setIsTruncated] = useState('') 
  const { id } = useParams();

  useEffect(() => {
   
    fetch(`/api/movie/${id}`,{method: 'POST'})
      .then(res => res.json())
      .then(data => {

        setMovieDetails(data)
        setIsTruncated(true)
      })
    }, [id]);

  let genres = movieDetails.genres.map((genre, i) => {
    return (
      <p className={`genres${i} genre`} key={genre.id}>
        {<Link to={`/genres/${genre.id}/${genre.name}/movie`}>{genre.name}</Link>}
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
    movieDetails.overview.length > 175
      ? movieDetails.overview.slice(0, 175).trim().concat(`...`)
      : movieDetails.overview;

  function toggleTruncated() {
    setIsTruncated(prevTruncated => !prevTruncated)
  }

  const showButton = isTruncated ? 'Show More':'Show Less'

  
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
            <p>{isTruncated ? truncated : movieDetails.overview} <br/><span className="show-button" onClick={toggleTruncated}>{(movieDetails.overview.length > 175) && showButton}</span></p>
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
