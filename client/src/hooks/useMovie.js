import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLoading } from "./useLoading/useLoading";
import { getMovieById } from "../services/motionPictureService";

export function useMovie() {
  const [movieDetails, setMovieDetails] = useState([]);
  const { isLoading, setIsLoading, loader } = useLoading();
  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    getMovieById(id, signal)
      .then((data) => {
        setMovieDetails(data);
        document.title = data.title;
        document
          .querySelector("meta[name='description']")
          .setAttribute("content", `${data.title} - ${data.overview}`);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [id]);

  return { movieDetails, isLoading, loader };
}
