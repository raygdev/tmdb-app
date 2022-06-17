import React from 'react'

export const ImageLinkSlider = ({images, name}) => {
  return (
   <>  
        <h3 style={{marginBottom: '0', marginLeft: '10px'}}>{name}</h3>
    <div className='trending-container'>
        {images}
    </div>
</>
  )
}
