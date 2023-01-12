import React, { useContext, useState } from 'react'
import classes from '../css/Input.module.css'
import ButtonPeffect from './ButtonPeffect'
import { doc, updateDoc, arrayUnion,} from "firebase/firestore";
import { AppContext } from './App';
import { v4 as uuid } from 'uuid';

const Input = ({ fetchTodos }) => {
  const data = useContext(AppContext)
  const [todo, setTodo] = useState({ title: "", done: false, tid: uuid() })
  const datef = `${data.date.getDate()}${data.date.getMonth()+1}${data.date.getFullYear()}`

  const handleChange = (event) => {
    let name = event.target.name;
    setTodo((prev) => {
      return (
        {
          ...prev,
          [name]: event.target.value
        }
      )
    })
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    todo.title = todo.title.trim();
    if (todo.title === "") {
      alert('cannot add empty todo')
      return
    }
    const userRef = doc(data.db, "data", data.user.uid);
    const obj = {}
    todo.timestamp = new Date();
    obj[`${datef}.todos`] =  arrayUnion(todo)
    await updateDoc(userRef,obj);
    setTodo({ title: "", done: false, tid: uuid() })
    await fetchTodos()
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <input name='title' value={todo.title || ""} onChange={handleChange} className={classes.input} type="text" placeholder='Enter todo' />
      <ButtonPeffect className={classes.button}></ButtonPeffect>
    </form>
  )
}

export default Input