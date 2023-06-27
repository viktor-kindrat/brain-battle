import { Link } from "react-router-dom"

import errorIcon from "./Svg/error.svg"

function DashboardError() {
    return (
        <div className="Dashboard__error">
            <div className="Dashboard__headline-group">
                <img src={errorIcon} alt="" />
                <h2 className="Dashboard__error-headline">Ooops! Something went wrong.</h2>
                <p className="Dashboard__error-msg">
                    You can't access this page because you are not logined! If you are firstly here, sign up and try again. If you had an account log in and retry.
                </p>
            </div>
            <div className="Dashboard__btn-group">
                <Link to="/logIn">
                    <button className="Dashboard__button Dashboard__button_transparent">Log in</button>
                </Link>
                <Link to="/signUp">
                    <button className="Dashboard__button Dashboard__button_filled">Sign up</button>
                </Link>
            </div>
        </div>
    )
}

export default DashboardError