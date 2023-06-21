import './Styles/App.css';
import background from "./Svg/background.svg"

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="App" style={{backgroundImage: `url("${background}")`}}>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
