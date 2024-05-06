import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/apiUrl";
import { useLoading } from "./useLoading/useLoading";

export function useGenres() {
    const [moviesFromGenre, setMoviesFromGenre] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState("");
    const {
      isLoading,
      setIsLoading,
      loader
    } = useLoading(true)
    const { genre_id, genre_name, motion_picture } = useParams();
  
    useEffect(() => {
      fetch(
        `${API_URL}/api/genres/?with_genres=${genre_id}&page=${page}&motion_picture=${motion_picture}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMoviesFromGenre(data.results);
          setTotalPages(data.total_pages);
        })
        .catch(e => console.log(e))
        .finally(() => setIsLoading(false))
      window.scrollTo(0, 0);
    }, [page]);

    return { moviesFromGenre, page, totalPages, genre_name, motion_picture, loader, isLoading, setIsLoading, setPage}
}
