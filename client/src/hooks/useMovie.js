import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLoading } from "./useLoading/useLoading";
import { API_URL } from "../utils/apiUrl";

export function useMovie() {
    const [movieDetails, setMovieDetails] = useState([]);
    const { isLoading, setIsLoading, loader } = useLoading();
    const { id } = useParams()
    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}/api/movie/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setMovieDetails(data);
            setIsLoading(false);
            document.title =  data.title
            document.querySelector("meta[name='description']").setAttribute("content", `${data.title} - ${data.overview}`)
          });
      }, [id]);
    
    return { movieDetails, isLoading, loader }
}