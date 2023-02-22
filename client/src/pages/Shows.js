import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ImageLinkSlider } from "../components/ImageLinkSlider";
import { useLoading } from "../hooks/useLoading";
import { displaySimilarTitles, setImageFirst, getGenres, truncate } from "../utils/utils";
import { showStyles } from "../utils/styles";

let IMG_URL = "https://image.tmdb.org/t/p/w500";

const Shows = (props) => {
  const [showDetails, setShowDetails] = useState("");
  const { isLoading, setIsLoading, loader } = useLoading();
  const { show_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://tmdb-api-rwj0.onrender.com/api/tvshow/${show_id}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setShowDetails(data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, [show_id]);

  let genres = getGenres(showDetails.genres)

  const { similar, credits } = showDetails;

  let similarTitle = displaySimilarTitles(similar?.results, "/shows/selected");
  let cast = displaySimilarTitles(setImageFirst(credits?.cast), "/people/selected");
  let crew = displaySimilarTitles(setImageFirst(credits?.crew), "/people/selected");
  let truncated = truncate(showDetails.overview)

  return isLoading ? (
    loader
  ) : (
    <div>
      <div
        className="movie-info-container"
        style={{
          ...showStyles,
          backgroundImage: showDetails && `url(${IMG_URL}${showDetails?.backdrop_path})`,
        }}
      >
        <div className="movie-info-content">
          <div className="img-col">
            <img src={showDetails && `${IMG_URL}${showDetails.poster_path}`} alt="" />
          </div>
          <div className="info-col">
            <h2 className="title">{showDetails.name}</h2>
            <p>{showDetails.overview}</p>
          </div>
        </div>
      </div>
      <div className="genre-col">
        <h3>Genres:({genres?.length})</h3>
        <div className="genres-container">{genres}</div>
      </div>
      <div className="related-titles-col">
        <ImageLinkSlider
          images={similarTitle}
          name={`Titles Related to ${showDetails.name}`}
        />
        <ImageLinkSlider images={cast} name="Cast" />
        {crew?.[0] && <ImageLinkSlider images={crew} name="Crew" />}
      </div>
    </div>
  );
};

export default Shows;
