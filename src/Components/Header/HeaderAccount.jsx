import logoutIcon from "./Svg/logout.svg"
import defAvatar from "../../Media/avatardef.svg"
import dashboardIcon from "./Svg/dashboard.svg"

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { gsap } from "gsap";

function HeaderAccount({ userData, setUserData, setInvokeStatus, logined, setLogined }) {
    let [openMenu, setOpenMenu] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        let tl = gsap.timeline();
        tl.set(".Header__account-nav", {
            scale: 0
        })
        tl.fromTo(".Header__account-nav", {
            scale: 0
        }, {
            scale: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "elastic.out"
        })
    }, [])

    let logoutHandler = () => {
        localStorage.removeItem("userToken");
        sessionStorage.clear();
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
            <img className="Header__nav-img" width={50} height={50} src={(userData.photoFile?.contentType || userData.photo) ? (userData.photoFile?.contentType) ? `data:${userData.photoFile.contentType};base64,${userData.photoFile.data}` : userData.photo : defAvatar} alt="user avatar" />
            <div className="Header__nav-name">{userData.name}</div>
            <div className="Header__menu">
                <Link to="/dashboard">
                    <button className="Header__account-btn"><img height={25} src={dashboardIcon} alt="dashboard" className="Header__account-icon" />Dashboard</button>
                </Link>
                <button onClick={logoutHandler} className="Header__account-btn Header__account-btn_logout"><img height={25} src={logoutIcon} alt="logout" className="Header__account-icon" />Log out</button>
            </div>
        </div>
    )
}

export default HeaderAccount