import "./Styles/Main.css"

import Home from "../Home/Home"
import Form from "../Form/Form";
import { Routes, Route, } from "react-router-dom";

function Main() {
    return (
        <main className="Main">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signUp" element={<Form type="register" />}></Route>
                <Route path="/logIn" element={<Form type="login" />}></Route>
            </Routes>
        </main>
    )
}

export default Main