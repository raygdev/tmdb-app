import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ImageLinkSlider } from "../components/imageLinkSlider/ImageLinkSlider";
import { GenreDisplay } from "../components/genreDisplay/GenreDisplay";
import { Player } from "../components/player/Player";
import { ImageInfo } from "../components/imageInfo/ImageInfo";
import { useLoading } from "../hooks/useLoading/useLoading";
import { displaySimilarTitles, setImageFirst } from "../utils/utils";
import { movieStyles } from "../utils/styles";
import { API_URL } from "../utils/apiUrl";

let IMG_URL = "https://image.tmdb.org/t/p/w500";
//comments
const Movie = (props) => {
  const [movieDetails, setMovieDetails] = useState([]);
  const { isLoading, setIsLoading, loader } = useLoading();
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/api/movie/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieDetails(data);
        setIsLoading(false);
        document.title =  data.title
        document.querySelector("meta[name='description']").setAttribute("content", `${data.title} - ${data.overview}`)
      });
  }, [id]);

  const { similar, credits, videos, recommendations } = movieDetails;
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
  const recommended = displaySimilarTitles(
    recommendations?.results,
    "/movie/selected"
  )

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
        {recommended?.[0] && <ImageLinkSlider images={recommended} name={"Recommended"} />}
        {similarTitle?.[0] && <ImageLinkSlider images={similarTitle} name={`Titles Related to ${movieDetails.title}`}/>}
        {cast?.[0] && <ImageLinkSlider images={cast} name="Cast" />}
        {crew?.[0] && <ImageLinkSlider images={crew} name="Crew" />}
      </div>
    </div>
  );
};

export default Movie;
