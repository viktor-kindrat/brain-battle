import "./Styles/Header.css"
import brainIcon from "./Svg/brain.svg"
import brainIconDark from "./Svg/brainDark.svg"
import HeaderAccount from "./HeaderAccount"

import { Link, useLocation } from "react-router-dom"
import { useEffect } from "react"

import { gsap } from "gsap"

function Header({ userData, setUserData, setInvokeStatus, logined, setLogined }) {
    let location = useLocation();

    useEffect(()=>{
        if(location.pathname.includes("stream")) {
            gsap.to(`.Header`, {
                y: "-200px",
                duration: 0.8,
                ease: "elastic.in(1, 0.3)"
            })
        } else {
            gsap.to(`.Header`, {
                y: "0",
                duration: 0.8,
                delay: 0.5,
                ease: "elastic.in(1, 0.3)"
            })
        }
    }, [location])
    return (
        <header className={(window.location.href.includes("/dashboard") || window.location.href.includes("/create-test") ? "Header Header_onlight" : "Header")}>
            <Link to="/">
                <div className="Header__logo-group">
                    <img className="Header__logo-image" height={50} width={50} src={(window.location.href.includes("/dashboard") || window.location.href.includes("/create-test") ? brainIconDark : brainIcon)} alt="logo" />
                    <p className="Header__logo-text">
                        Brain <br /> Battle
                    </p>
                </div>
            </Link>
            <nav className="Header__nav">
                {
                    logined ? <>
                        <HeaderAccount {...{ userData, setUserData, setInvokeStatus, logined, setLogined }} />
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