import React, { useContext, useEffect, useState } from 'react'
import classes from '../css/Notes.module.css'
import ButtonPeffect from './ButtonPeffect'
import Calendar from 'react-calendar';
import { AppContext } from './App';
import { doc, updateDoc, getDoc, } from "firebase/firestore";
import { ReactComponent as Loading } from '../images/Gear02s200px.svg'


const Notes = () => {
  const data = useContext(AppContext)
  const [notes, setNotes] = useState({})
  const [loading, setLoading] = useState(false)

  const datef = `${data.date.getDate()}${data.date.getMonth() + 1}${data.date.getFullYear()}`

  const pfetchNotes = () => {
    const userRef = doc(data.db, "data", data.user.uid);
    setLoading(true)
    getDoc(userRef).then(userData => userData.get(`${datef}.notes`)).then(notes => {
      if (notes) {
        // console.log(notes);
        setNotes(notes)
        setLoading(false)
      } else {
        setNotes({})
        setLoading(false)
      }

    }).catch(err => {
      console.log(err)
      setNotes({})
      setLoading(false)
    })
  }

  useEffect(
    () => {
      setTimeout(pfetchNotes(), 1000)
    }
    , [data])

  const handleChange = (event) => {
    let name = event.target.name;
    setNotes((prev) => {
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
    if (notes.journal === "") {
      alert('cannot add empty todo')
      return
    }
    const userRef = doc(data.db, "data", data.user.uid);
    const obj = {}
    notes.timestamp = new Date();
    obj[`${datef}.notes`] = notes
    setLoading(true);
    await updateDoc(userRef, obj).then(doc => {
      setLoading(false);
    }).catch((doc) => {
      alert("something went wrong")
      setLoading(false)
    }

    )
    // await fetchTodos()
  }

  return (
    <div className={classes.notesMainBody}>
      <div >
        <Calendar className={classes.ecalendar} onChange={data.onChange} value={data.date} />
      </div>
      <div className={classes.notesDiv}>
        {loading ?
          <Loading className={classes.loading} /> :
          <form onSubmit={submitHandler} className={classes.formEnd} action="">
            <textarea required placeholder="Write your Daily Journal" name="journal" className={classes.dayEnd} onChange={handleChange} value={notes.journal || ""}>
              {notes}
            </textarea>
            <ButtonPeffect className={classes.endBtn} name={"save"}></ButtonPeffect>
          </form>
        }

      </div>
    </div>
  )
}

export default Notes