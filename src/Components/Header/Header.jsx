import "./Styles/Header.css"
import brainIcon from "./Svg/brain.svg"

function Header (){
    return (
        <header className="Header">
            <div className="Header__logo-group">
                <img className="Header__logo-image" height={50} width={50} src={brainIcon} alt="logo" />
                <p className="Header__logo-text">
                    Brain <br /> Battle
                </p>
            </div>
            <nav className="Header__nav">
                <button className="Header__nav-btn Header__nav-btn_filled">Sign up</button>
                <button className="Header__nav-btn Header__nav-btn_transparent">Log in</button>
            </nav>
        </header>
    )
}

export default Header