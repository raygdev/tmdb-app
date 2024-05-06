import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLoading } from "./useLoading/useLoading";
import { API_URL } from "../utils/apiUrl";

export function useShow() {
    const [showDetails, setShowDetails] = useState("");
    const { isLoading, setIsLoading, loader } = useLoading(true);
    const { show_id } = useParams();
  
    useEffect(() => {
      if(!isLoading) setIsLoading(true)
      fetch(`${API_URL}/api/tvshow/${show_id}`)
        .then((res) => res.json())
        .then((data) => {
          setShowDetails(data);
          document.title = data.name
          document.querySelector("meta[name='description']").setAttribute("content", `${data.name} - ${data.overview}`)
        })
        .catch((e) => console.log(e))
        .finally(() => setIsLoading(false))
    }, [show_id]);

    return { showDetails, isLoading, loader }
}