import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ImageLinkSlider } from "../components/ImageLinkSlider";
import { useLoading } from "../hooks/useLoading";
import { displaySimilarTitles } from "../utils";

let IMG_URL = "https://image.tmdb.org/t/p/w500";

const Shows = (props) => {
  const [showDetails, setShowDetails] = useState("");
  const {
    isLoading,
    setIsLoading,
    loader
  } = useLoading()
  const { show_id } = useParams();

  useEffect(() => {
    setIsLoading(true)
    fetch(`/api/tvshow/${show_id}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setShowDetails(data)
        setIsLoading(false)
      })
      .catch((e) => console.log(e));
  }, [show_id]);

  let genres =showDetails?.genres?.map((genre, i) => {
        return (
          <p className={`genres${i} genre`} key={genre.id}>
            {
              <Link to={`/genres/${genre.id}/${genre.name}/tv`}>
                {genre.name}
              </Link>
            }
          </p>
        );
      });

  const { similar, credits } = showDetails;

  let similarTitle =  displaySimilarTitles(similar?.results, "/shows/selected");
  let cast = displaySimilarTitles(credits?.cast, "/people/selected");
  const setImagesFirst = credits?.crew.reduce((prev, curre) => {
        if (!curre.profile_path) {
          prev.push(curre);
        } else prev.unshift(curre);
        return prev;
      }, []);
  let crew = displaySimilarTitles(setImagesFirst, "/people/selected")
    

  const styles = {
    backgroundColor: "rgba(0,0,0,0.6)",
    backgroundImage: `url(${IMG_URL}${showDetails.backdrop_path})`,
    backgroundBlendMode: "multiply",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "white",
  };

  return (
    isLoading ? (loader) : (<div>
      <div className="movie-info-container" style={styles}>
        <div className="movie-info-content">
          <div className="img-col">
            <img src={`${IMG_URL}${showDetails.poster_path}`} alt="" />
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
        { crew  && <ImageLinkSlider images={crew} name="Crew" />}
      </div>
    </div>)
  );
};

export default Shows;
