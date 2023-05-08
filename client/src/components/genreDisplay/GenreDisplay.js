import React from 'react'
import { GenreLinks } from '../genreLinks/GenreLinks'
import styles from "./GenreDisplay.module.css"

export const GenreDisplay = ({listOfGenres, motion_picture}) => {
  const genres = listOfGenres?.map((genre, i) => {
    return (
        <GenreLinks 
            genre={genre}
            motion_picture={motion_picture}
            index={i}
            key={genre.id}
        />
    )
  })
  return (
    <div className={styles.genre_col}>
        <h3>Genres:({genres?.length})</h3>
        <div className={styles.genres_container}>{genres}</div>
    </div>
  )
}
