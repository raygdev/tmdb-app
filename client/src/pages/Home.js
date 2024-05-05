import { ImageLinkSlider } from "../components/imageLinkSlider/ImageLinkSlider";
import { SpanBtn } from "../components/spanBtn/SpanBtn";
import { displaySimilarTitles } from "../utils/utils";
import { useBaseMotionPicture } from "../hooks/useBaseMotionPicture";



const Home = (props) => {
  const {
    movies,
    isLoading,
    loader,
    motionPicture,
    selectMotionPicture 
  } = useBaseMotionPicture()
  
  document.title = "Home"

  const isSelected = motionPicture === "movie"
  const motionPicturePath = motionPicture === "movie" ? "movie" : "shows";

  const trendingMovies = displaySimilarTitles(
    movies,
    `/${motionPicturePath}/selected`
  );

  if(isLoading) return loader

  return (
    
    <div className="home_container">
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
  
};
export default Home;
