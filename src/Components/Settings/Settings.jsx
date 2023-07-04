import "./Styles/Settings.css"

import { Routes, Route, Link } from "react-router-dom"

function Settings({ userData, setUserData, logined, setInvokeStatus, invokeStatus }) {
    return (
        <section className="Settings">
            <h2 className="Settings__headline">Settings</h2>
            <Link to="/settings/">account</Link>
            <Link to="/settings/security">security</Link>
            <Routes>
                <Route path="/" element={<div>Account Settings</div>} />
                <Route path="security" element={<div>Security settings</div>} />
            </Routes>
        </section>
    )
}

export default Settings