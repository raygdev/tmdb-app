import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ImageLinkSlider } from "../components/imageLinkSlider/ImageLinkSlider";
import { ImageInfo } from "../components/imageInfo/ImageInfo";
import { GenreDisplay } from "../components/genreDisplay/GenreDisplay";
import { Player } from "../components/player/Player";
import { useLoading } from "../hooks/useLoading/useLoading";
import { displaySimilarTitles, setImageFirst } from "../utils/utils";
import { showStyles } from "../utils/styles";
import { API_URL } from "../utils/apiUrl";

let IMG_URL = "https://image.tmdb.org/t/p/w500";

const Shows = (props) => {
  const [showDetails, setShowDetails] = useState("");
  const { isLoading, setIsLoading, loader } = useLoading();
  const { show_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/api/tvshow/${show_id}`)
      .then((res) => res.json())
      .then((data) => {
        setShowDetails(data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, [show_id]);


  const { similar, credits, videos } = showDetails;

  let similarTitle = displaySimilarTitles(similar?.results, "/shows/selected");
  let cast = displaySimilarTitles(setImageFirst(credits?.cast), "/people/selected");
  let crew = displaySimilarTitles(setImageFirst(credits?.crew), "/people/selected");
  let foundFirstTrailer = videos?.results.find(video => (video.site === "YouTube") && (video.type === "Trailer"))

  return isLoading ? (
    loader
  ) : (
    <div>
      <ImageInfo 
        info={showDetails}
        styles={showStyles}
        imgUrl={IMG_URL}
        releaseDate={showDetails?.first_air_date}
      />
      <GenreDisplay 
        listOfGenres={showDetails.genres}
        motion_picture={"tv"}
      />
      {
        foundFirstTrailer ?
        <Player videoKey={foundFirstTrailer?.key} /> :
        <h2>No Trailer Availaible.</h2>
      }
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
