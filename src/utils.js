import { Link } from "react-router-dom";
import React from "react";

const imageSource = "https://image.tmdb.org/t/p/w200";
async function getTitles(url, callback) {
  const res = await fetch(url);
  const data = await res.json();
  return callback(data);
}

function displaySimilarTitles(titles, path, toggle) {
  let hash = {};
  let images = titles
    .filter(
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

const initMovieState = {
  back_drop: "",
  genres: [],
  overview: "",
  poster_path: "",
  release_date: "",
  runtime: "",
  title: "",
  vote_average: "",
  videos: {
    results: [],
  },
  similar: {
    results: [],
  },
  credits: {
    cast: [{ id: 1, name: "", profile_path: "" }],
    crew: [{ id: 1, name: "", profile_path: "" }],
  },
};

export { getTitles, displaySimilarTitles, initMovieState };
