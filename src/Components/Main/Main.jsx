import "./Styles/Main.css"

import Home from "../Home/Home"
import Form from "../Form/Form";
import { Routes, Route, } from "react-router-dom";

function Main({logined, setLogined}) {
    return (
        <main className="Main">
            <Routes>
                <Route path="/" element={<Home {...{logined}} />}></Route>
                <Route path="/signUp" element={<Form {...{logined, setLogined}} type="reg" />}></Route>
                <Route path="/logIn" element={<Form {...{logined, setLogined}} type="log" />}></Route>
            </Routes>
        </main>
    )
}

export default Main