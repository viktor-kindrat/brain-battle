import "./Styles/SetPassword.css"

import { useNavigate } from "react-router-dom"

import { useCallback } from "react"

function SetPassword({ sessionExpiered, setInvokeStatus, invokeStatus }) {
    let navigate = useNavigate()

    const setWarning = useCallback((el, text) => {
        el.parentElement.parentElement.querySelector(".SetPassword__warning").innerText += text
        return false
    }, [])
    const validatePassword = useCallback((password, element) => {
        element.parentElement.parentElement.querySelector(".SetPassword__warning").innerText = ""
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
            element.parentElement.parentElement.querySelector(".SetPassword__warning").innerText = `Your password isn's strong enough. Check this requirements and try again: ${element.parentElement.parentElement.querySelector(".SetPassword__warning").innerText}`
            return false
        } else {
            return true
        }
    }, [setWarning]);

    let setPasswordHandler = useCallback((e)=>{
        let value = e.target.parentElement.querySelector(".SetPassword__input").value;
        let validate = validatePassword(value, e.target)
        if (validate) {
            fetch("https://brain-battle-server-wpcm.onrender.com/auth/changeData", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Baerer ${localStorage.getItem("userToken")}`
                },
                body: JSON.stringify({password: value})
            })
            .then(res=> res.json())
            .then(data=>{
                if (data.status === "ok") {
                    navigate("/dashboard")
                } else {
                    sessionExpiered()
                }
            })
            .catch(e=>console.log(e))
        }
    }, [navigate, validatePassword, sessionExpiered])
    return (
        <section className="SetPassword">
            <h2 className="SetPassword__headline">Your account is without password. Let's setup it</h2>
            <div className="SetPassword__group">
                <input type="text" placeholder="Strong password" className="SetPassword__input" />
                <button onClick={setPasswordHandler} className="SetPassword__submit">Set</button>
            </div>
            <p className="SetPassword__warning"></p>
        </section>
    )
}

export default SetPassword