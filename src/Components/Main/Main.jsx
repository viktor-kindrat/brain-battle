import "./Styles/Main.css"

import Home from "../Home/Home"
import Form from "../Form/Form";
import DashboardRoot from "../DashboardRoot/DashboardRoot";
import CreateTest from "../CreateTest/CreateTest"
import StreamTest from "../StreamTest/StreamTest";
import JoinTest from "../JoinTest/JoinTest";
import TestingArea from "../TestingArea/TestingArea";
import SetPassword from "../SetPassword/SetPassword";
import Settings from "../Settings/Settings";

import { Routes, Route, useNavigate } from "react-router-dom";

import { useEffect } from "react";

function Main({ userData, setUserData, setInvokeStatus, invokeStatus, logined, setLogined }) {
    let navigate = useNavigate();
    useEffect(() => {
        if (logined && !userData.password && userData.name) {
            navigate("/setPassword")
        }
    }, [logined, userData, navigate])
    return (
        <main className="Main">
            <Routes>
                <Route path="/" element={<Home {...{ logined }} />}></Route>
                <Route path="/signUp" element={<Form {...{ logined, setLogined, setInvokeStatus, invokeStatus }} type="reg" />}></Route>
                <Route path="/logIn" element={<Form {...{ logined, setLogined, setInvokeStatus, invokeStatus }} type="log" />}></Route>
                <Route path="/dashboard" element={<DashboardRoot {...{ logined, setLogined, userData, setInvokeStatus }} />}></Route>
                <Route path="/create-test" element={<CreateTest {...{ logined, setLogined, invokeStatus, setUserData, setInvokeStatus }} />}></Route>
                <Route path="/stream" element={<StreamTest {...{ logined, setLogined, invokeStatus, userData, setUserData, setInvokeStatus }} />}></Route>
                <Route path="/join" element={<JoinTest />}></Route>
                <Route path="/testing" element={<TestingArea />}></Route>
                <Route path="/setPassword" element={<SetPassword {...{ setInvokeStatus, invokeStatus }} />}></Route>
                <Route path="/settings" element={<Settings {...{ userData, logined, setInvokeStatus, invokeStatus }} />}></Route>
            </Routes>
        </main>
    )
}

export default Main