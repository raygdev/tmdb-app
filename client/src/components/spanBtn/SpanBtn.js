import React from 'react'
import styles from "./SpanBtn.module.css"

export const SpanBtn = (props) => {
  const {
    name,
    selectMotionPicture,
    isSelected,
    selectedValue
  } = props

  return (
    <span 
        onClick={() => selectMotionPicture(selectedValue)} 
        className={`${styles.toggle_button} ${isSelected && `${styles.active}`}`}
    >
        {name}
    </span>
  )
}
