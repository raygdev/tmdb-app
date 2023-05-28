import React, { useState } from "react"
import { truncate } from "../../utils/utils"
import ImageStyles from "./ImageInfo.module.css"

export const ImageInfo = ({ styles, info, imgUrl, releaseDate }) => {
  const [isTruncated, setIsTruncated] = useState(info.overview?.length > 175)

  function toggleTruncated() {
    setIsTruncated(prevTruncated => !prevTruncated)
  }

  const showButton = isTruncated ? "Show More" : "Show Less"
  const year = (releaseDate && new Date(releaseDate).getFullYear()) || null
  let truncated = truncate(info.overview)

  return (
    <div
      className={ImageStyles.movie_info_container}
      style={{
        ...styles,
        backgroundImage:
          info.backdrop_path && `url(${imgUrl}${info.backdrop_path})`
      }}
    >
      <div className={ImageStyles.movie_info_content}>
        <div className={ImageStyles.img_col}>
          <figure>
            <img
              src={info.poster_path && `${imgUrl}${info.poster_path}`}
              alt={info.title}
            />
            <div className={ImageStyles.captions}>
              {year && <figcaption>{year}</figcaption>}
              {info.runtime ? (
                <figcaption>{info.runtime} minutes</figcaption>
              ) : info.number_of_seasons ? (
                <figcaption>
                  {info.number_of_seasons}{" "}
                  {info.number_of_seasons > 1 ? "Seasons" : "Season"}
                </figcaption>
              ) : (
                <figcaption>Not Available</figcaption>
              )}
            </div>
          </figure>
        </div>
        <div className={ImageStyles.info_col}>
          <h2 className="title">{info.title || info.name}</h2>
          <p>
            {isTruncated ? truncated : info.overview} <br />
            <span className={ImageStyles.show_button} onClick={toggleTruncated}>
              {info.overview?.length > 175 && showButton}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
