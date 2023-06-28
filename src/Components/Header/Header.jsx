import "./Styles/Header.css"
import brainIcon from "./Svg/brain.svg"
import brainIconDark from "./Svg/brainDark.svg"
import HeaderAccount from "./HeaderAccount"

import { Link, useLocation } from "react-router-dom"
import { useEffect } from "react"

function Header({ logined, setLogined }) {
    let location = useLocation();

    useEffect(()=>{
        return
    }, [location])
    return (
        <header className={(window.location.href.includes("/dashboard") ? "Header Header_onlight" : "Header")}>
            <Link to="/">
                <div className="Header__logo-group">
                    <img className="Header__logo-image" height={50} width={50} src={(window.location.href.includes("/dashboard") ? brainIconDark : brainIcon)} alt="logo" />
                    <p className="Header__logo-text">
                        Brain <br /> Battle
                    </p>
                </div>
            </Link>
            <nav className="Header__nav">
                {
                    logined ? <>
                        <HeaderAccount {...{ logined, setLogined }} />
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