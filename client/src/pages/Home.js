import React, { useState, useEffect, useContext } from "react";
import { ImageLinkSlider } from "../components/imageLinkSlider/ImageLinkSlider";
import { SpanBtn } from "../components/spanBtn/SpanBtn";
import { Context } from "../hooks/ContextProvider";
import { useLoading } from "../hooks/useLoading/useLoading";
import { displaySimilarTitles } from "../utils/utils";
import { API_URL } from "../utils/apiUrl";


const Home = (props) => {
  const [movies, setMovies] = useState([]);
  const {
    isLoading,
    setIsLoading,
    loader
  } = useLoading()

  const { selectMotionPicture, motionPicture } = useContext(Context);
  document.title = "Home"
 
  useEffect(() => {
    setIsLoading(true)
    fetch(`${API_URL}/api/motionpicture?motionPicture=${motionPicture}`)
      .then((res) => res.json())
      .then((data) => {
          setMovies( data.results);
          setIsLoading(false)
          document.querySelector("meta[name='description']").setAttribute("content", "Search movies and tv shows and create a watchlist for shows to watch")  
      })
      .catch((e) => console.log(e));
      
  }, [motionPicture]);

  const isSelected = motionPicture === "movie"
  const motionPicturePath = motionPicture === "movie" ? "movie" : "shows";

  const trendingMovies = displaySimilarTitles(
    movies,
    `/${motionPicturePath}/selected`
  );

  return (
    isLoading ? (loader) :
     (<div className="home_container">
        <div className="toggle_btn_container">
          <SpanBtn
            selectMotionPicture={selectMotionPicture}
            isSelected={isSelected}
            name={"Movies"}
            selectedValue={"movie"}
          />
          <span> -or- </span>
          <SpanBtn
            selectMotionPicture={selectMotionPicture}
            isSelected={!isSelected}
            name={"Shows"}
            selectedValue={"tv"}
          />
          
        </div>
        <ImageLinkSlider images={trendingMovies} name="Trending" />
      </div>
      )
  );
};
export default Home;
