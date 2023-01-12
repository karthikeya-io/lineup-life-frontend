import React, { useContext, useEffect, useState } from 'react'
import classes from '../css/Todos.module.css'
import Input from './Input'
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { AppContext } from './App';
import { ReactComponent as Loading} from '../images/Gear02s200px.svg'


const Todos = () => {

  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const data = useContext(AppContext)
  const datef = `${data.date.getDate()}${data.date.getMonth() + 1}${data.date.getFullYear()}`

  function compare(a, b) {
    if (a.done === true && b.done === false) {
      return 1;
    }
    if (a.done === false && b.done === true) {
      return -1;
    }
    return 0;
  }


  const fetchTodos = async () => {
    const userRef = doc(data.db, "data", data.user.uid);
    setLoading(true);
    const todos = await (await getDoc(userRef)).get(`${datef}.todos`);
    // console.log(todos);

    if (todos) {
      todos.sort(compare)
      setTodos(todos)
      setLoading(false)
    } else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
      setLoading(false)
    }
  }


  const pfetchTodos = () => {
    setLoading(true);
    const userRef = doc(data.db, "data", data.user.uid);
    getDoc(userRef).then(userData => userData.get(`${datef}.todos`)).then(dtodos => {
      if (dtodos) {
        // console.log(dtodos);
        dtodos.sort(compare)
        setTodos(dtodos)
      } else {
        setTodos([])
      }
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setTodos([])
      setLoading(false)
    })
  }

  useEffect(
    () => {
      setTimeout(pfetchTodos(), 1000)
    }
    , [data])



  const changeHandler = async (todo) => {
    const userRef = doc(data.db, "data", data.user.uid);
    const obj = {}
    obj[`${datef}.todos`] = arrayRemove(todo)
    await updateDoc(userRef, obj);
    obj[`${datef}.todos`] = arrayUnion({ ...todo, done: !todo.done })
    await updateDoc(userRef, obj).then(async (doc) => {
      await fetchTodos()
    })
  }

  const deleteHandler = async (todo) => {
    const userRef = doc(data.db, "data", data.user.uid);
    const obj = {}
    obj[`${datef}.todos`] = arrayRemove(todo)
    await updateDoc(userRef, obj).then(async (doc) => {
      await fetchTodos()
    })
    
  }


  return (
    <div className={classes.todosDiv}>
      <div className={classes.add}>
        <Input fetchTodos={fetchTodos} className={classes.inputBox}></Input>
      </div>
      <div>
        <div className={classes.todoList}>
          {
          loading ?  <Loading className={classes.loading}/>
          : 
            todos.length > 0 ? todos.map(todo => {
              return (
                <div className={classes.todo} key={todo.tid}>
                  <label className={todo.done ? `${classes.container} ${classes.done}` : `${classes.container}`}>{todo.title}
                    <input onChange={(event) => changeHandler(todo, event)} type="checkbox" checked={todo.done ? "checked" : ""} name={todo.id} />
                    <span className={classes.checkmark}></span>
                  </label>
                  <button onClick={(event) => deleteHandler(todo, event)} className={classes.deleteButton}>Delete</button>
                </div> 
              ) 
            }) : <div> no todos for {data.date.toLocaleDateString()}</div>
          
          }
          
        </div>
      </div>
    </div>
  )
}

export default Todos
