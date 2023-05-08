import React from 'react'
import styles from "./ImageLinkSlider.module.css"

export const ImageLinkSlider = ({images, name}) => {
  return (
   <>  
    <h3 style={{marginBottom: '0', marginLeft: '10px'}}>{name}</h3>
    <div className={styles.trending_container}>
        {images}
    </div>
</>
  )
}
