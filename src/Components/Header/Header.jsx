import "./Styles/Header.css"
import brainIcon from "./Svg/brain.svg"
import { Link } from "react-router-dom"

function Header() {
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
                <Link to="/signUp">
                    <button className="Header__nav-btn Header__nav-btn_filled">Sign up</button>
                </Link>
                <Link to="/logIn">
                    <button className="Header__nav-btn Header__nav-btn_transparent">Log in</button>
                </Link>
            </nav>
        </header>
    )
}

export default Header