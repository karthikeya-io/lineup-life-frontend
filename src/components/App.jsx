import { Outlet } from 'react-router-dom';
import '../css/App.css';
import Nav from './Nav';
import { doc, setDoc } from "firebase/firestore";
import 'react-calendar/dist/Calendar.css';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //work with your own config
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const AppContext = React.createContext();

function App() {
  const db = getFirestore(app);
  const [user, setUser] = useState(null)
  const [date, onChange] = useState(new Date());

  useEffect(() => {
    onAuthStateChanged(auth, (userDetails) => {
      if (userDetails) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // console.log(userDetails);
        setUser(userDetails)
        // const uid = user.uid;
        // ...
        
      } else {
        // User is signed out
        // ...
      setUser(null)
      }
    });
  }, [])


  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const userDetails = result.user;
        setUser(userDetails)
        // console.log(userDetails);
        const userRef = doc(db, 'data', userDetails.uid);
        await setDoc(userRef, {}, { merge: true }).then((doc) => {
          console.log(doc);
          window.location.reload()
        }).catch(err => {
          console.log(err);
        })
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }

  const signout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setUser(null)
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }
  return (
    <AppContext.Provider value={{ user: user, date: date, onChange: onChange, db: db }}>
      <div >
        <header>
          <Nav signout={signout} signInWithGoogle={signInWithGoogle} user={user} ></Nav>
        </header>
        {user ? <Outlet /> : <div className='center'><button onClick={signInWithGoogle}>Signin</button></div>}

      </div>
    </AppContext.Provider>
  );
}

export default App;
