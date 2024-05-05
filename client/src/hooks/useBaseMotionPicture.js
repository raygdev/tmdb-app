import { useState, useEffect, useContext } from 'react'
import { useLoading } from './useLoading/useLoading';
import { Context } from './ContextProvider';
import { API_URL } from '../utils/apiUrl';

export function useBaseMotionPicture() {
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

  return { isLoading, loader, selectMotionPicture, motionPicture, movies}
}