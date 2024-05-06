import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLoading } from "./useLoading/useLoading";
import { getShowById } from "../services/motionPictureService";

export function useShow() {
  const [showDetails, setShowDetails] = useState("");
  const { isLoading, setIsLoading, loader } = useLoading(true);
  const { show_id } = useParams();

  useEffect(() => {
    if (!isLoading) setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    getShowById(show_id, signal)
      .then((data) => {
        setShowDetails(data);
        document.title = data.name;
        document
          .querySelector("meta[name='description']")
          .setAttribute("content", `${data.name} - ${data.overview}`);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
    return () => controller.abort("page change");
  }, [show_id]);

  return { showDetails, isLoading, loader };
}
