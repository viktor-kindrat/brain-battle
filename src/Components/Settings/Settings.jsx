import "./Styles/Settings.css"

import { Routes, Route, Link } from "react-router-dom"

import { useEffect, useCallback } from "react"
import { gsap } from "gsap"
import AccountSettings from "../AccountSettings/AccountSettings"
import SecuritySettings from "../SecuritySettings/SecuritySettings"


function Settings({ sessionExpired, userData, setUserData, logined, setLogined, setInvokeStatus, invokeStatus }) {
    useEffect(()=>{
        let tl = gsap.timeline();
        tl.set(".Settings__menu-btn", {
            x: -50, opacity: 0
        })
        tl.fromTo(".Settings__menu-btn", {
            x: -50, opacity: 0
        }, {
            x: 0, opacity: 1, duration: 0.2, stagger: 0.1,
            delay: 0.3
        })
        gsap.fromTo(".Settings__animation-block", { scale: 0 }, { scale: 1, duration: 0.7, ease: "elastic.out", stagger: 0.1 })
    }, []);

    let handleActive = useCallback((e)=>{
        document.querySelectorAll(".Settings__menu-btn").forEach(el=>el.classList.remove("Settings__menu-btn_active"))
        e.target.classList.add("Settings__menu-btn_active")
    }, [])
    
    return (
        <section className="Settings">
            <h2 className="Settings__headline Settings__animation-block">Settings</h2>
            <div className="Settings__content">
                <div className="Settings__menu">
                    <Link to="/settings/"><button onClick={handleActive} className="Settings__menu-btn">Account</button></Link>
                    <Link to="/settings/security"><button onClick={handleActive} className="Settings__menu-btn">Security</button></Link>
                </div>
                <div className="Settings__detail">
                    <Routes>
                        <Route path="/" element={<AccountSettings {...{sessionExpired, userData, setUserData, logined, setLogined, setInvokeStatus, invokeStatus }} />} />
                        <Route path="security" element={<SecuritySettings {...{sessionExpired, userData, setUserData, logined, setLogined, setInvokeStatus, invokeStatus }}/>} />
                    </Routes>
                </div>
            </div>
        </section>
    )
}

export default Settings