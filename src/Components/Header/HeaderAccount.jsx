import logoutIcon from "./Svg/logout.svg"
import defAvatar from "../../Media/avatardef.svg"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { gsap } from "gsap";

function HeaderAccount({ logined, setLogined }) {
    let [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem("userInfo")) || {});
    let [openMenu, setOpenMenu] = useState(false)
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
                            } : { ...data.data.UserClone._doc }
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

    let logoutHandler = () => {
        localStorage.removeItem("userToken");
        sessionStorage.removeItem("userInfo");
        setLogined(false);
        setUserData({});
        navigate("/")
    }

    let toggleMenu = () => {
        let tl = gsap.timeline();
        if (!openMenu) {
            tl.set(".Header__menu", {visibility: "visible", opacity: 0})
            tl.to(".Header__account-nav", {
                background: "#ffffff",
                borderRadius: "5px 5px 0 0",
                duration: 0.2,
                ease: "power2.inOut"
            })
            tl.to(".Header__nav-name", {
                color: "#141414", duration: 0.1, delay: -0.2
            })
            tl.to(".Header__menu", {
                opacity: 1,
                duration: 0.2,
                ease: "power2.inOut"
            })
        } else {
            tl.to(".Header__menu", {
                opacity: 0,
                duration: 0.2,
                ease: "power2.inOut"
            })
            tl.to(".Header__nav-name", {
                color: "", duration: 0.1, delay: -0.2
            })
            tl.to(".Header__account-nav", {
                background: "",
                borderRadius: "5px",
                duration: 0.2,
                ease: "power2.inOut"
            })
            tl.set(".Header__menu", {visibility: "hidden", opacity: 0})
        }
        tl.then(()=>setOpenMenu(!openMenu))
    }
    return (
        <div className="Header__account-nav" onClick={toggleMenu}>
            <img className="Header__nav-img" width={50} height={50} src={(Object.keys(userData.photoFile || {}).length !== 0 || userData.photo) ? (userData.photoFile) ? `data:${userData.photoFile.contentType};base64,${userData.photoFile.data}` : userData.photo : defAvatar} alt="user avatar" />
            <div className="Header__nav-name">{userData.name}</div>
            <div className="Header__menu">
                <button onClick={logoutHandler} className="Header__account-btn Header__account-btn_logout"><img height={25} src={logoutIcon} alt="logout" className="Header__account-icon" />Log out</button>
            </div>
        </div>
    )
}

export default HeaderAccount