import './Styles/App.css';
import background from "./Svg/background.svg"

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import { useState, useEffect } from 'react';

function App() {
  const token = localStorage.getItem("userToken") || "";
  let [logined, setLogined] = useState(token ? true : false)
  let [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem("userInfo")) || {});
  let [invokeStatus, setInvokeStatus] = useState(false);

  useEffect(() => {
    console.log("ok")
    if (token) {
      if (Object.keys(userData).length === 0) {
        fetch(`https://brain-battle-server-wpcm.onrender.com/db/getUserInfo`, {
          headers: { "Authorization": `Baerer ${token}` }
        }).then(res => res.json())
          .then(data => {
            const newUserData = (data.data.UserClone.photoFile) ? {
              ...data.data.UserClone._doc,
              photoFile: {
                ...data.data.UserClone.photoFile
              }
            } : { ...data.data.UserClone._doc }
            sessionStorage.setItem("userInfo", JSON.stringify(newUserData))
            setUserData(newUserData)
          })
          .catch(e => console.log(e))
      }
    }
    // eslint-disable-next-line
  }, [invokeStatus, token])

  return (
    <div className="App" style={{ backgroundImage: `url("${background}")` }}>
      <Header {...{ userData, setUserData, setInvokeStatus, logined, setLogined }} />
      <Main {...{ userData, setUserData, setInvokeStatus, invokeStatus, logined, setLogined }} />
      <Footer {...{ userData, setUserData, setInvokeStatus, logined, setLogined }} />
    </div>
  );
}

export default App;
