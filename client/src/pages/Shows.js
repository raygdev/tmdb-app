import { ImageLinkSlider } from "../components/imageLinkSlider/ImageLinkSlider";
import { ImageInfo } from "../components/imageInfo/ImageInfo";
import { GenreDisplay } from "../components/genreDisplay/GenreDisplay";
import { Player } from "../components/player/Player";
import { displaySimilarTitles, setImageFirst } from "../utils/utils";
import { showStyles } from "../utils/styles";
import { useShow } from "../hooks/useShow";

let IMG_URL = "https://image.tmdb.org/t/p/w500";

const Shows = (props) => {
  const { showDetails, isLoading, loader } = useShow()

  if(isLoading) return loader

  const { similar, credits, videos, recommendations } = showDetails;

  let similarTitle = displaySimilarTitles(similar?.results, "/shows/selected");
  let cast = displaySimilarTitles(setImageFirst(credits?.cast), "/people/selected");
  let crew = displaySimilarTitles(setImageFirst(credits?.crew), "/people/selected");
  let recommended = displaySimilarTitles(recommendations?.results, "/shows/selected")
  let foundFirstTrailer = videos?.results.find(video => (video.site === "YouTube") && (video.type === "Trailer"))

  return (
    <div>
      <ImageInfo 
        info={showDetails}
        styles={showStyles}
        imgUrl={IMG_URL}
        releaseDate={showDetails.first_air_date}
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
        {recommended?.[0] && <ImageLinkSlider images={recommended} name={"Recommended"}/>}
        {similarTitle?.[0] && <ImageLinkSlider images={similarTitle} name={`Titles Related to ${showDetails.name}`}/>}
        {cast?.[0] && <ImageLinkSlider images={cast} name="Cast" />}
        {crew?.[0] && <ImageLinkSlider images={crew} name="Crew" />}
      </div>
    </div>
  );
};

export default Shows;
