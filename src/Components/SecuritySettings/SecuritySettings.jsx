import "./Styles/SecuritySettings.css"
import { gsap } from "gsap";
import { useEffect, useCallback } from "react";
import viewPasswordIcon from "./Svg/eye.svg"

function SecuritySettings({ sessionExpired, userData, setUserData, logined, setLogined, setInvokeStatus, invokeStatus }) {
    useEffect(() => {
        gsap.fromTo(".SecuritySettings__animation", { scale: 0 }, { scale: 1, duration: 0.7, delay: 0.2, ease: "elastic.out", stagger: 0.1 })
    }, [])

    const inputFocusHandler = useCallback((e) => {
        let label = e.target.parentElement.querySelector(".SecuritySettings__label");
        label.style.top = "-3px";
        label.style.fontSize = "10px";
        label.style.fontWeight = "800"
        label.style.color = "#333333"
    }, [])

    const inputBlurHandler = useCallback((e) => {
        if (e.target.value === "") e.target.parentElement.querySelector(".SecuritySettings__label").removeAttribute("style")
    }, [])
    return (
        <section className="SecuritySettings">
            <h2 className="SecuritySettings__headline SecuritySettings__animation">Security</h2>
            <div className="SecuritySettings__section">
                <div className="SecuritySettings__group SecuritySettings__animation">
                    <h3 className="SecuritySettings__headline SecuritySettings__headline_3">Password</h3>
                    <div className="SecuritySettings__row">
                        <label className="SecuritySettings__label">Set new password</label>
                        <input onFocus={inputFocusHandler} onBlur={inputBlurHandler} type="password" className="SecuritySettings__input" />
                        <button type="button" className="SecuritySettings__show-password"><img height={25} src={viewPasswordIcon} alt="view" /></button>
                        <p className="SecuritySettings__warning"></p>
                    </div>
                    <div className="SecuritySettings__row">
                        <label className="SecuritySettings__label">Confirm your password</label>
                        <input onFocus={inputFocusHandler} onBlur={inputBlurHandler} type="password" className="SecuritySettings__input" />
                        <button type="button" className="SecuritySettings__show-password"><img height={25} src={viewPasswordIcon} alt="view" /></button>
                        <p className="SecuritySettings__warning"></p>
                    </div>
                    <div className="SecuritySettings__row">
                        <button className="SecuritySettings__btn SecuritySettings__btn_save">Save</button>
                        <button className="SecuritySettings__btn SecuritySettings__btn_reset">Reset</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SecuritySettings