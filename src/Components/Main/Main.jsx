import "./Styles/Main.css"

import Home from "../Home/Home"
import Form from "../Form/Form";
import DashboardRoot from "../DashboardRoot/DashboardRoot";
import CreateTest from "../CreateTest/CreateTest"
import StreamTest from "../StreamTest/StreamTest";
import { Routes, Route, } from "react-router-dom";

function Main({ userData, setUserData, setInvokeStatus, invokeStatus, logined, setLogined }) {
    return (
        <main className="Main">
            <Routes>
                <Route path="/" element={<Home {...{logined}} />}></Route>
                <Route path="/signUp" element={<Form {...{logined, setLogined, setInvokeStatus, invokeStatus}} type="reg" />}></Route>
                <Route path="/logIn" element={<Form {...{logined, setLogined, setInvokeStatus, invokeStatus}} type="log" />}></Route>
                <Route path="/dashboard" element={<DashboardRoot {...{logined, setLogined, userData, setInvokeStatus}} />}></Route>
                <Route path="/create-test" element={<CreateTest {...{logined, setLogined, invokeStatus, setUserData, setInvokeStatus}}/>}></Route>
                <Route path="/stream" element={<StreamTest {...{logined, setLogined, invokeStatus, setUserData, setInvokeStatus}}/>}></Route>
            </Routes>
        </main>
    )
}

export default Main