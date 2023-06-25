import './Styles/App.css';
import background from "./Svg/background.svg"

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import { useState } from 'react';

function App() {
  const token = localStorage.getItem("userToken") || "";
  let [logined, setLogined] = useState(token ? true : false)
  return (
    <div className="App" style={{backgroundImage: `url("${background}")`}}>
      <Header {...{logined, setLogined}}/>
      <Main {...{logined, setLogined}}/>
      <Footer {...{logined, setLogined}}/>
    </div>
  );
}

export default App;
