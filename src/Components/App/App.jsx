import './Styles/App.css';
import background from "./Svg/background.svg"

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const token = (localStorage.getItem("userToken") || window.location.href.split("?token=")[1]) || false;
  let [logined, setLogined] = useState(token ? true : false)
  let [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem("userInfo")) || {});
  let [invokeStatus, setInvokeStatus] = useState(false);
  
  useEffect(() => {
    if (window.location.href.split("?token=")[1]) {
      localStorage.setItem("userToken", window.location.href.split("?token=")[1]);
      sessionStorage.clear()
    }
  }, [setUserData])
  
  const sessionExpiered = () => {
    alert("Your session expiered. Please re-login and try again");
    navigate("/logIn")
    setLogined(false)
    setUserData({});
    sessionStorage.clear();
    localStorage.clear();
  }
  
  useEffect(() => {
    if (token) {
      if (Object.keys(userData).length === 0) {
        fetch(`https://brain-battle-server-wpcm.onrender.com/db/getUserInfo`, {
          headers: { "Authorization": `Baerer ${token}` }
        }).then(res => res.json())
          .then(data => {
            if (data.status === "ok") {
              const newUserData = (data.data.UserClone.photoFile) ? {
                ...data.data.UserClone._doc,
                photoFile: {
                  ...data.data.UserClone.photoFile
                }
              } : { ...data.data.UserClone._doc }
              sessionStorage.setItem("userInfo", JSON.stringify(newUserData))
              setUserData(newUserData)
            } else {
              sessionExpiered()
            }
          })
          .catch(e => console.log(e))
      }
    }
    // eslint-disable-next-line
  }, [invokeStatus, token])

  return (
    <div className="App" style={{ backgroundImage: `url("${background}")` }}>
      <Header {...{ sessionExpiered, userData, setUserData, setInvokeStatus, logined, setLogined }} />
      <Main {...{ sessionExpiered, userData, setUserData, setInvokeStatus, invokeStatus, logined, setLogined }} />
      <Footer {...{ sessionExpiered, userData, setUserData, setInvokeStatus, logined, setLogined }} />
    </div>
  );
}

export default App;
