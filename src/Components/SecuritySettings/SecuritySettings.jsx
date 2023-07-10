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

    const togglePasswordShown = useCallback((e) => {
        let input = e.target.parentElement.querySelector(".SecuritySettings__input");
        input.type = input.type === "password" ? "text" : "password"
    }, []);

    const setWarning = useCallback((el, text) => {
        el.parentElement.querySelector(".SecuritySettings__warning").innerText += text
        return false
    }, [])

    const validatePassword = useCallback((password, element) => {
        element.parentElement.querySelector(".SecuritySettings__warning").innerText = ""
        const capitalLettersRegex = /[A-Z]+/gi;
        const lowercaseLettersRegex = /[a-z]+/gi;
        const numbersRegex = /[0-9]+/gi;
        const specSymbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/gi;
        const consecutiveSymbolsRegex = /(.)\1{2}/g;

        const mathcLength = password.length >= 12 ? true : setWarning(element, "\n- Password must have at least 12 symbols")
        const matchCapital = (capitalLettersRegex.test(password)) ? true : setWarning(element, "\n- Password must contain at least 1 capital letter");
        const matchLower = (lowercaseLettersRegex.test(password)) ? true : setWarning(element, "\n- Password must contain at least 1 lowercase letter");
        const matchNumber = (numbersRegex.test(password)) ? true : setWarning(element, "\n- Password must contain at least 1 number");
        const matchSpecsymbol = (specSymbolRegex.test(password)) ? true : setWarning(element, "\n- Password must contain at least 1 special symbol");
        const matchConsecutive = (!consecutiveSymbolsRegex.test(password)) ? true : setWarning(element, "\n- Password must not three or more consecutive symbols");
        if (!matchCapital || !matchLower || !matchNumber || !matchSpecsymbol || !mathcLength || !matchConsecutive) {
            element.parentElement.querySelector(".SecuritySettings__warning").innerText = `Your password isn's strong enough. Check this requirements and try again: ${element.parentElement.querySelector(".SecuritySettings__warning").innerText}`
            return false
        } else {
            return true
        }
    }, [setWarning])

    const savePassswordHandler = useCallback(() => {
        let password = document.querySelector("#SecuritySettings__password-field");
        let confirmPassword = document.querySelector("#SecuritySettings__confirm-password-field");
        confirmPassword.parentElement.querySelector(".SecuritySettings__warning").innerText = "";
        password.parentElement.querySelector(".SecuritySettings__warning").innerText = "";

        if (confirmPassword.value === password.value) {
            let validate = validatePassword(password.value, password);
            if (validate) {
                fetch("https://brain-battle-server-wpcm.onrender.com/auth/changeData", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({password: password.value})
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.status === "ok") {
                            setUserData({});
                            setInvokeStatus(!invokeStatus);
                            alert("New password was set successfuly");
                        } else {
                            sessionExpired()
                        }
                    })
                    .catch(e => console.log(e));
            }
        } else {
            setWarning(confirmPassword, "Password does not match")
        }

    }, [validatePassword])
    return (
        <section className="SecuritySettings">
            <h2 className="SecuritySettings__headline SecuritySettings__animation">Security</h2>
            <div className="SecuritySettings__section">
                <div className="SecuritySettings__group SecuritySettings__animation">
                    <h3 className="SecuritySettings__headline SecuritySettings__headline_3">Password</h3>
                    <div className="SecuritySettings__row">
                        <label className="SecuritySettings__label">Set new password</label>
                        <input id="SecuritySettings__password-field" onFocus={inputFocusHandler} onBlur={inputBlurHandler} type="password" className="SecuritySettings__input" />
                        <button onClick={togglePasswordShown} type="button" className="SecuritySettings__show-password"><img height={25} src={viewPasswordIcon} alt="view" /></button>
                        <p className="SecuritySettings__warning"></p>
                    </div>
                    <div className="SecuritySettings__row">
                        <label className="SecuritySettings__label">Confirm your password</label>
                        <input id="SecuritySettings__confirm-password-field" onFocus={inputFocusHandler} onBlur={inputBlurHandler} type="password" className="SecuritySettings__input" />
                        <button onClick={togglePasswordShown} type="button" className="SecuritySettings__show-password"><img height={25} src={viewPasswordIcon} alt="view" /></button>
                        <p className="SecuritySettings__warning"></p>
                    </div>
                    <div className="SecuritySettings__row">
                        <button onClick={savePassswordHandler} className="SecuritySettings__btn SecuritySettings__btn_save">Save</button>
                        <button className="SecuritySettings__btn SecuritySettings__btn_reset">Reset</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SecuritySettings