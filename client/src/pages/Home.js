import React, { useState, useEffect, useContext } from "react";
import { ImageLinkSlider } from "../components/imageLinkSlider/ImageLinkSlider";
import { Context } from "../hooks/ContextProvider";
import { useLoading } from "../hooks/useLoading/useLoading";
import { displaySimilarTitles } from "../utils/utils";


const Home = (props) => {
  const [movies, setMovies] = useState([]);
  const {
    isLoading,
    setIsLoading,
    loader
  } = useLoading()

  const { toggleMotionPicture, motionPicture } = useContext(Context);
  useEffect(() => {
    setIsLoading(true)
    fetch(`/api/motionpicture?motionPicture=${motionPicture}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
          setMovies( data.results);
          setIsLoading(false)
      })
      .catch((e) => console.log(e));
      
  }, [motionPicture]);

  const motionPictureTitle = motionPicture === "movie" ? "Movies" : "TV Shows";
  const motionPicturePath = motionPicture === "movie" ? "movie" : "shows";

  const trendingMovies = displaySimilarTitles(
    movies,
    `/${motionPicturePath}/selected`
  );

  return (
    isLoading ? (loader) :
     (<div>
      <h2 style={{ cursor: "pointer" }} onClick={toggleMotionPicture}>
        {motionPictureTitle}
      </h2>
      <ImageLinkSlider images={trendingMovies} name="Trending" />
      </div>
      )
  );
};
export default Home;
