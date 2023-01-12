import React, { useContext, useEffect, useState } from 'react'
import classes from '../css/Todos.module.css'
import expClasses from '../css/Expenditures.module.css'
import ButtonPeffect from './ButtonPeffect'
import { v4 as uuid } from 'uuid';
import { AppContext } from './App';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { ReactComponent as Loading } from '../images/Gear02s200px.svg'



const Expenditures = () => {
  const data = useContext(AppContext)
  const [expenditure, setExpenditure] = useState({ eid: uuid() })
  const [expenditures, setExpenditures] = useState([])
  const [loading, setLoading] = useState(false)


  const datef = `${data.date.getDate()}${data.date.getMonth() + 1}${data.date.getFullYear()}`

  const pfetchExpenditures = () => {
    const userRef = doc(data.db, "data", data.user.uid);
    setLoading(true);
    getDoc(userRef).then(userData => userData.get(`${datef}.expenditures`)).then(expenditures => {
      if (expenditures) {
        // console.log(expenditures);
        setExpenditures(expenditures)
        setLoading(false);
      } else {
        setExpenditures([])
        setLoading(false);
      }

    }).catch(err => {
      console.log(err)
      setExpenditures([])
    })
  }


  const fetchExpenditures = async () => {
    const userRef = doc(data.db, "data", data.user.uid);
    setLoading(true);
    const expenditures = await (await getDoc(userRef)).get(`${datef}.expenditures`);

    if (expenditures) {
      setExpenditures(expenditures)
      setLoading(false);
    } else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
      setLoading(false);
    }
  }

  useEffect(
    () => {
      setTimeout(pfetchExpenditures(), 1000)
    }
    , [data])

  const deleteHandler = async (expenditure) => {
    const userRef = doc(data.db, "data", data.user.uid);
    const obj = {}
    obj[`${datef}.expenditures`] = arrayRemove(expenditure)
    setLoading(true)
    await updateDoc(userRef, obj).then(async (doc) => {
      await fetchExpenditures()
    })
  }


  const handleChange = (event) => {
    let name = event.target.name;
    setExpenditure((prev) => {
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
    expenditure.name = expenditure.name.trim();
    if (expenditure.name === "" || expenditure.amount === 0) {
      alert('cannot add expenditure with empty name or amount')
      return
    }
    expenditure.timestamp = new Date();
    const userRef = doc(data.db, "data", data.user.uid);
    const obj = {}
    obj[`${datef}.expenditures`] = arrayUnion(expenditure)
    await updateDoc(userRef, obj).then(async (doc) => {
      await fetchExpenditures()
    })
    setExpenditure({ eid: uuid() })
  }


  return (
    <div className={classes.todosDiv}>
      <div className={classes.add}>
        <div className={expClasses.expInputDiv}>
          <form onSubmit={submitHandler}>
            <input required onChange={handleChange} placeholder='enter amount spent' className={expClasses.expInput} type="number" min="0" name="amount" id="" value={expenditure.amount || ""} />
            <select onChange={handleChange} className={expClasses.expCategory} name="category" id="">
              <option value="">Category</option>
              <option value="Clothing">Clothing</option>
              <option value="Entertainment">Entertainment </option>
              <option value="Food">Food</option>
              <option value="Household Items">Household Items/Supplies</option>
              <option value="Housing">Housing</option>
              <option value="Insurance">Insurance</option>
              <option value="Investment">Investment</option>
              <option value="Medical/Healthcare">Medical/Healthcare</option>
              <option value="Personal">Personal</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities">Utilities</option>

            </select>
            <input required onChange={handleChange} placeholder='Expenditure name' value={expenditure.name || ""} className={`${expClasses.expInput} ${expClasses.expInput} `} type="text" name="name" id="" />
            <ButtonPeffect ></ButtonPeffect>
          </form>
        </div>
      </div>
      {
        loading ?
          <Loading className={classes.loading}></Loading> :
          <div className={expClasses.expenditureList}>
            {expenditures.length > 0 ?
              <table className={expClasses.table}>
                <thead>
                  <tr className={expClasses.tr}>
                    <th className={expClasses.th}>Expenditure name</th>
                    <th className={expClasses.th}>amount</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    expenditures.map(expenditure => {
                      return (
                        <tr key={expenditure.eid} className={expClasses.tr}>
                          <td className={`${expClasses.td} ${expClasses.break}`}>{expenditure.name}</td>
                          <td className={expClasses.td}>{expenditure.amount}</td>
                          <td className={expClasses.td}>
                            <button onClick={(event) => deleteHandler(expenditure, event)} className={classes.deleteButton}>Delete</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table> : <div>no expenditures on {data.date.toLocaleDateString()}</div>
            }
          </div>
      }

    </div>
  )
}

export default Expenditures