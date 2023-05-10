import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ImageLinkSlider } from "../components/imageLinkSlider/ImageLinkSlider";
import { GenreDisplay } from "../components/genreDisplay/GenreDisplay";
import { Player } from "../components/Player";
import { ImageInfo } from "../components/imageInfo/ImageInfo";
import { useLoading } from "../hooks/useLoading/useLoading";
import { displaySimilarTitles, setImageFirst } from "../utils/utils";
import { movieStyles } from "../utils/styles";

let IMG_URL = "https://image.tmdb.org/t/p/w500";
//comments
const Movie = (props) => {
  const [movieDetails, setMovieDetails] = useState([]);
  const { isLoading, setIsLoading, loader } = useLoading();
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://tmdb-api-rwj0.onrender.com/api/movie/${id}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setMovieDetails(data);
        setIsLoading(false);
      });
  }, [id]);

  const { similar, credits, videos } = movieDetails;
  const similarTitle = displaySimilarTitles(
    similar?.results,
    "/movie/selected"
  );
  const cast = displaySimilarTitles(
    setImageFirst(credits?.cast),
    "/people/selected"
  );
  const crew = displaySimilarTitles(
    setImageFirst(credits?.crew),
    "/people/selected"
  );

  const foundFirstTrailer = videos?.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return isLoading ? (
    loader
  ) : (
    <div>
      <ImageInfo
        imgUrl={IMG_URL}
        info={movieDetails}
        styles={movieStyles}
        releaseDate={movieDetails?.release_date}
      />
      <GenreDisplay
        listOfGenres={movieDetails.genres}
        motion_picture={"movie"}
      />

      <div>
        {foundFirstTrailer ? (
          <Player videoKey={foundFirstTrailer.key} />
        ) : (
          <h2>No Trailer Available.</h2>
        )}
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
