 import React from "react"
 import { Link } from "react-router-dom"
 
 export function GenreLinks({genre, motion_picture, index}){
    return (
      <p className={`genres${index} genre`}>
        {
          <Link to={`/genres/${genre.id}/${genre.name}/${motion_picture}`}>
            {genre.name}
          </Link>
        }
      </p>
    );
  }