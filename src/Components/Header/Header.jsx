import "./Styles/Header.css"
import brainIcon from "./Svg/brain.svg"
import logoutIcon from "./Svg/logout.svg"
import { Link, useNavigate } from "react-router-dom"

import defAvatar from "../../Media/avatardef.svg"

import { useState, useEffect } from "react";

function Header({ logined, setLogined }) {
    let [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem("userInfo")) || {});
    const navigate = useNavigate();
    useEffect(() => {
        let token = localStorage.getItem("userToken") || "";
        if (logined) {
            if (token) {
                console.log(userData)
                if (Object.keys(userData).length === 0) {
                    console.log("here")
                    fetch(`https://brain-battle-server-wpcm.onrender.com/db/getUserInfo`, {
                        headers: { "Authorization": `Baerer ${token}` }
                    }).then(res => res.json())
                        .then(data => {
                            console.log(data);
                            const newUserData = (data.data.UserClone.photoFile) ? {
                                ...data.data.UserClone._doc,
                                photoFile: {
                                    ...data.data.UserClone.photoFile
                                }
                            } : {...data.data.UserClone._doc}
                            sessionStorage.setItem("userInfo", JSON.stringify(newUserData))
                            setUserData(newUserData)
                        })
                        .catch(e => console.log(e))
                }
            } else {
                setLogined(false)
            }
        }
        // eslint-disable-next-line
    }, [logined, setLogined])

    let logoutHandler = ()=>{
        localStorage.removeItem("userToken");
        sessionStorage.removeItem("userInfo");
        setLogined(false);
        setUserData({});
        navigate("/")
    }
    return (
        <header className="Header">
            <Link to="/">
                <div className="Header__logo-group">
                    <img className="Header__logo-image" height={50} width={50} src={brainIcon} alt="logo" />
                    <p className="Header__logo-text">
                        Brain <br /> Battle
                    </p>
                </div>
            </Link>
            <nav className="Header__nav">
                {
                    logined ? <>
                        <div className="Header__account-nav">
                            <img className="Header__nav-img" width={50} height={50} src={(Object.keys(userData.photoFile || {}).length !== 0 || userData.photo) ? (userData.photoFile) ? `data:${userData.photoFile.contentType};base64,${userData.photoFile.data}` : userData.photo : defAvatar} alt="user avatar" />
                            <div className="Header__nav-name">{userData.name}</div>
                            <div className="Header__menu">
                                <button onClick={logoutHandler} className="Header__account-btn Header__account-btn_logout"><img height={25} src={logoutIcon} alt="logout" className="Header__account-icon" />Log out</button>
                            </div>
                        </div>
                    </> : <>
                        <Link to="/signUp"><button className="Header__nav-btn Header__nav-btn_filled">Sign up</button></Link>
                        <Link to="/logIn"><button className="Header__nav-btn Header__nav-btn_transparent">Log in</button></Link>
                    </>
                }
            </nav>
        </header>
    )
}

export default Header