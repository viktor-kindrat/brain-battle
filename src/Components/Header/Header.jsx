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
        </header>
    )
}

export default Header