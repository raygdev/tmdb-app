import React from 'react'
import styles from "./Player.module.css"

export const Player = ({ videoKey }) => {
 
  return (
    <div className={styles.container}>
        <iframe 
            width="100%"
            height="100%"
            style={{border: "none"}}
            src={`https://www.youtube.com/embed/${videoKey}`}
            allowFullScreen
        ></iframe>
    </div>
  )
}
