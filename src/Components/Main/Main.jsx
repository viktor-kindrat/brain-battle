import "./Styles/Main.css"

import Home from "../Home/Home"
import Form from "../Form/Form";
import { Routes, Route, } from "react-router-dom";

function Main() {
    return (
        <main className="Main">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signUp" element={<Form type="reg" />}></Route>
                <Route path="/logIn" element={<Form type="log" />}></Route>
            </Routes>
        </main>
    )
}

export default Main