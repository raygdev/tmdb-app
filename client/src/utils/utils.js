import { Link } from "react-router-dom";
import React from "react";

const imageSource = "https://image.tmdb.org/t/p/w200";

function displaySimilarTitles(titles, path, toggle) {
  let hash = {};
  let images = titles?.filter(
      (title) => title.poster_path || title.profile_path || !title.profile_path
    )
    .map((title, i) => {
      if (!hash[title.id]) {
        hash[title.id] = title.id;
        return (
          <div className={`movie-container movie-container${i}`} key={title.id}>
            <Link to={`${path}/${title.id}`} onClick={toggle}>
              <img
                loading="lazy"
                src={
                  title.poster_path
                    ? `${imageSource}${title.poster_path}`
                    : title.profile_path
                    ? `${imageSource}${title.profile_path}`
                    : "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                }
                alt={title.title || title.name}
              />
            </Link>
            <h3 style={{ marginTop: "0", marginBottom: "0", color: "white" }}>
              {title.name}
            </h3>
          </div>
        );
      }
    });
  return images;
}

function setImageFirst(people){
  let image = []
  let non_image = []
  people?.forEach(person => {
      if(!person.profile_path){
        non_image.push(person)
      }else{
        image.push(person)
      }
  })
  return image.concat(non_image)
}

function getGenres(genres){
  return genres?.map((genre, i) => {
    return (
      <p className={`genres${i} genre`} key={genre.id}>
        {
          <Link to={`/genres/${genre.id}/${genre.name}/movie`}>
            {genre.name}
          </Link>
        }
      </p>
    );
  });
}

function truncate(string){
  return string?.length > 175
  ? string.slice(0, 175).trim().concat(`...`)
  : string;
}

export { displaySimilarTitles, setImageFirst, getGenres, truncate };
