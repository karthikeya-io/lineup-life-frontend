import React from 'react'
import Todos from './Todos'
import classes from '../css/Home.module.css'
import Expenditures from './Expenditures'
import Notes from './Notes'

const Home = () => {
  return (
    <div className={classes.grid}>
      <div className={classes.gridItem}>
        <Todos></Todos>
      </div>
      <div className={classes.gridItem}>
        <Expenditures></Expenditures>
      </div>
      <div className={classes.gridItem}>
        <Notes></Notes>
      </div>

    </div>
  )
}

export default Home