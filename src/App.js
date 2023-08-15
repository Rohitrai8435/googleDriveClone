
import Data from "./Data";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./index.css"
import Icon from './Image/googleDriveIcon.png'
import { useState } from "react";
import { auth,provider } from "./firebase";



function App() {
  const [user, setUser] = useState(null)
  const loginHandler = (event) => {
    event.preventDefault()
    auth.signInWithPopup(provider).then(({ user }) => {
      setUser(user)
    }).catch(error => {
      alert(error.message);
    })

  }

  return (
    <>
      {
        user ? (
          <>
            <Header photoURL={user.photoURL}></Header>
            <div className="App">
              <Sidebar />
              <Data />
            </div>
          </>
        ) : (
          <div className="loginpage">
            <h1>Welcome to Google Drive </h1>
            <img id="loginIcon" src={Icon} alt="" />
            <button onClick={loginHandler}>Login GoogleDrive</button>
          </div>
        )
      }
    </>
  );
}

export default App;
