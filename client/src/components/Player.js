import React from 'react'

export const Player = ({ videoKey }) => {
 
  return (
    <div style={{height: "75vh", width: "75vw", margin: "0 auto"}}>
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
