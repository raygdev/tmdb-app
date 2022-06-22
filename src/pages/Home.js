import React, { useState, useEffect, useContext } from "react";
import { ImageLinkSlider } from "../components/ImageLinkSlider";
import { Context } from "../hooks/ContextProvider";
import { displaySimilarTitles } from "../utils";

const Home = (props) => {
  const [movies, setMovies] = useState([]);

  const { toggleMotionPicture, motionPicture } = useContext(Context);
  useEffect(() => {
    fetch(`/api/motionpicture?motionPicture=${motionPicture}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setMovies((prevMovies) => data.results);
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
    <div>
      <h2 style={{ cursor: "pointer" }} onClick={toggleMotionPicture}>
        {motionPictureTitle}
      </h2>
      <ImageLinkSlider images={trendingMovies} name="Trending" />
    </div>
  );
};
export default Home;
