let IMG_URL = "https://image.tmdb.org/t/p/w500";

const styles = {
    backgroundColor: "rgba(0,0,0,0.6)",
    backgroundImage: `url(${IMG_URL}${showDetails?.backdrop_path})`,
    backgroundBlendMode: "multiply",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "white",
  };

  export default styles