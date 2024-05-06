import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLoading } from "./useLoading/useLoading";
import { getMotionPicturesFromGenre } from "../services/motionPictureService";

export function useGenres() {
  const [moviesFromGenre, setMoviesFromGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const { isLoading, setIsLoading, loader } = useLoading(true);
  const params = useParams();
  useEffect(() => {
    if (!isLoading) setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    getMotionPicturesFromGenre({ ...params, page: page }, signal)
      .then((data) => {
        setMoviesFromGenre(data.results);
        setTotalPages(data.total_pages);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
    document.title = params.genre_name;
    window.scrollTo(0, 0);
    return () => controller.abort("page change");
  }, [page]);

  return {
    moviesFromGenre,
    page,
    totalPages,
    genre_name: params.genre_name,
    motion_picture: params.motion_picture,
    loader,
    isLoading,
    setIsLoading,
    setPage,
  };
}
