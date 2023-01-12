import React from 'react'
import classes from '../css/ButtonPeffect.module.css'

const ButtonPeffect = ({name}) => {
  return (
    <button type='submit' className={classes.button}>{name || "Add"}</button>
  )
}

export default ButtonPeffect