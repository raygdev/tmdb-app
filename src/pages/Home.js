import React, { useState, useEffect, useContext } from "react";
import { ImageLinkSlider } from "../components/ImageLinkSlider";
import { Context } from "../hooks/ContextProvider";
import { displaySimilarTitles } from "../utils";

const Home = (props) => {
  const [movies, setMovies] = useState([]);
  
  const {
    URL,
    toggleMotionPicture,
    motionPicture,
  } = useContext(Context);
  console.log('home rendered')
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
      return () => {
        fetch(URL)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
      }
  }, [motionPicture]);

  const motionPictureTitle = motionPicture === "movie" ? "Movies" : "TV Shows";
  const motionPicturePath = motionPicture === "movie" ? "movie" : "shows";

  const trendingMovies = displaySimilarTitles(movies,`/${motionPicturePath}/selected`)
  
  
  return  (
    <div>
      <h2 style={{ cursor: "pointer" }} onClick={toggleMotionPicture}>
        {motionPictureTitle}
      </h2>
      <ImageLinkSlider images={trendingMovies} name="Trending" />
    </div>
  );
};
export default Home