import { useState, useEffect, useContext } from "react";
import { useLoading } from "./useLoading/useLoading";
import { Context } from "./ContextProvider";
import { getMotionPictures } from "../services/motionPictureService";

export function useBaseMotionPicture() {
  const [movies, setMovies] = useState([]);
  const { isLoading, setIsLoading, loader } = useLoading(true);

  const { selectMotionPicture, motionPicture } = useContext(Context);
  document.title = "Home";
  useEffect(() => {
    if (!isLoading) setIsLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;
    getMotionPictures(motionPicture, signal)
      .then((data) => {
        setMovies(data);
        document
          .querySelector("meta[name='description']")
          .setAttribute(
            "content",
            "Search movies and tv shows and create a watchlist for shows to watch"
          );
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));

    return () => controller.abort("getMotionPicture aborted");
  }, [motionPicture]);

  return { isLoading, loader, selectMotionPicture, motionPicture, movies };
}
