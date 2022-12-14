import React from 'react'
import classes from '../css/Todos.module.css'
import ButtonPeffect from './ButtonPeffect'
import Input from './Input'


const Todos = () => {
  return (
    <div className={classes.todosDiv}>
      <div className={classes.add}>
        <Input className={classes.inputBox}></Input>
        <ButtonPeffect className={classes.button}></ButtonPeffect>
      </div>
      <div>
        <div className={classes.todoList}>
          <label className={ `${classes.container} ${classes.done}` }>One
            <input type="checkbox"  />
            <span className={classes.checkmark}></span>
          </label>
          <label className={classes.container}>Two
            <input type="checkbox"  />
            <span className={classes.checkmark}></span>
          </label><label className={classes.container}>Three
            <input type="checkbox"  />
            <span className={classes.checkmark}></span>
            </label><label className={classes.container}>Three
            <input type="checkbox"  />
            <span className={classes.checkmark}></span>
            </label><label className={classes.container}>Three
            <input type="checkbox"  />
            <span className={classes.checkmark}></span>
            </label><label className={classes.container}>Three
            <input type="checkbox"  />
            <span className={classes.checkmark}></span>
            </label><label className={classes.container}>Three
            <input type="checkbox"  />
            <span className={classes.checkmark}></span>
            </label><label className={classes.container}>Three
            <input type="checkbox"  />
            <span className={classes.checkmark}></span>
            </label><label className={classes.container}>Three
            <input type="checkbox"  />
            <span className={classes.checkmark}></span>
            </label><label className={classes.container}>Three
            <input type="checkbox"  />
            <span className={classes.checkmark}></span>
            </label><label className={classes.container}>Three
            <input type="checkbox"  />
            <span className={classes.checkmark}></span>
            </label><label className={classes.container}>Three
            <input type="checkbox"  />
            <span className={classes.checkmark}></span>
            </label>
            <label className={classes.container}>Three
            <input type="checkbox"  />
            <span className={classes.checkmark}></span>
            </label>
            <label className={classes.container}>Three
            <input type="checkbox"  />
            <span className={classes.checkmark}></span>
            </label>
        </div>
      </div>
    </div>
  )
}

export default Todos