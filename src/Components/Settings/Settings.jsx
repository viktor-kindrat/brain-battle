import "./Styles/Settings.css"

import { Routes, Route, Link } from "react-router-dom"

function Settings({ userData, setUserData, logined, setInvokeStatus, invokeStatus }) {
    return (
        <section className="Settings">
            <h2 className="Settings__headline">Settings</h2>
            <div className="Settings__content">
                <div className="Settings__menu">
                    <Link to="/settings/">
                        <button className="Settings__menu-btn">Account</button>
                    </Link>
                    <Link to="/settings/security">
                        <button className="Settings__menu-btn">Security</button>
                    </Link>
                </div>
                <div className="Settings__detail">
                    <Routes>
                        <Route path="/" element={<div>Account Settings</div>} />
                        <Route path="security" element={<div>Security settings</div>} />
                    </Routes>
                </div>
            </div>
        </section>
    )
}

export default Settings