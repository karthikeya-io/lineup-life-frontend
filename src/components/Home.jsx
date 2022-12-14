import React from 'react'
import Todos from './Todos'
import classes from '../css/Home.module.css'

const Home = () => {
  return (
    <div className={classes.grid}>
      <div className={classes.gridItem}>
        <Todos></Todos>
      </div>
      {/* <div>
        <Todos></Todos>
      </div>
      <div>
        <Todos></Todos>
      </div> */}

    </div>
  )
}

export default Home