 import React from "react"
 import { Link } from "react-router-dom"
 import styles from "./GenreLinks.module.css"
 
 export function GenreLinks({genre, motion_picture, index}){
    return (
          <Link className={styles.genre} to={`/genres/${genre.id}/${genre.name}/${motion_picture}`}>
            {genre.name}
          </Link>
    );
  }