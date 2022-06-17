import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import { ImageLinkSlider } from "../components/ImageLinkSlider";
import { getTitles, displaySimilarTitles } from "../utils";

const Shows = (props) => {
  const [showDetails, setShowDetails] = useState('');
  const { show_id } = useParams();
  
    
    let IMG_URL = "https://image.tmdb.org/t/p/w500";
    useEffect(() => {
        getTitles(`https://api.themoviedb.org/3/tv/${show_id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,similar,credits`, (data) => {
            setShowDetails(data);
        });
        
    }, [show_id])
    

   
  console.log('show rendered')
  
  let genres = showDetails ? showDetails.genres.map((genre, i) => {
        return (

            <p className={`genres${i} genre`}  key={genre.id}>
              {<Link to={`/genres/${genre.id}`}>{genre.name}</Link>}
            </p>
        );
      }):null

  const {similar, credits} = showDetails
      
  let similarTitle = showDetails
    ? displaySimilarTitles(similar.results, "/shows/selected")
    : null;
  let cast = showDetails 
    ? displaySimilarTitles(credits.cast, '/people/selected')
    : null
    const setImagesFirst = showDetails ? credits.crew.reduce((prev,curre) => {
      if(!curre.profile_path){
          prev.push(curre)
       }else prev.unshift(curre)
      return prev
    },[]) : null
  let crew = showDetails 
    ? displaySimilarTitles(setImagesFirst, '/people/selected')
    :null
  const styles = {
    backgroundColor: 'rgba(0,0,0,0.6)',
    backgroundImage: `url(${IMG_URL}${showDetails.backdrop_path})`,
    backgroundBlendMode: 'multiply',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: 'white'
  }

  return  (
    <div >
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
        <h3>Genres:({genres ? genres.length : null})</h3>
        <div className="genres-container">{genres}</div>
      </div>
      <div className="related-titles-col">
        <ImageLinkSlider images={similarTitle} name={`Titles Related to ${showDetails.name}`} />
        <ImageLinkSlider images={cast} name='Cast' />
        {showDetails ? crew[0] && <ImageLinkSlider images={crew} name='Crew' />: null}
      </div>
    </div>
  );
};

export default Shows
