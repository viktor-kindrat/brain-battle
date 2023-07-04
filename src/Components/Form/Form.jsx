import "./Styles/Form.css"

import FormInput from "./FormInput"

import { useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import googleIcon from "./Svg/google.svg"
import avatarDef from "./Svg/avatardef.svg"
import imageUpload from "./Svg/addImage.svg"

function Form({ type, logined, setLogined, setInvokeStatus, invokeStatus }) {
    const navigate = useNavigate();
    useEffect(()=>{
        if (logined) {
            navigate("/dashboard")
        }
    }, [logined, navigate])

    let [imagePreview, setImagePreview] = useState("");

    const setWarning = useCallback((el, text) => {
        el.parentElement.querySelector(".Form__warning").innerText += text
        return false
    }, [])

    const avatarChangeHandler = useCallback((e) => {
        if (e.target.files[0]) {
            if ((e.target.files[0].size * (10 ** (-6))) <= 1.5) {
                let url = URL.createObjectURL(e.target.files[0])
                setWarning(e.target, "")
                setImagePreview(url)
            } else {
                setWarning(e.target, "The size of your image is too large. The maximum allowed size is 1.5MB. Please compress the image and attempt the upload again.")
                setImagePreview(avatarDef)
            }
        }
    }, [setWarning])

    const inputFocusHandler = useCallback((e) => {
        let label = e.target.parentElement.querySelector(".Form__label");
        label.style.top = "-3px";
        label.style.fontSize = "10px";
        label.style.fontWeight = "800"
        label.style.color = "#333333"
    }, [])

    const inputBlurHandler = useCallback((e) => {
        if (e.target.value === "") e.target.parentElement.querySelector(".Form__label").removeAttribute("style")
    }, [])

    const validatePassword = useCallback((password, element) => {
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
            element.parentElement.querySelector(".Form__warning").innerText = `Your password isn's strong enough. Check this requirements and try again: ${element.parentElement.querySelector(".Form__warning").innerText}`
            return false
        } else {
            return true
        }
    }, [setWarning])

    const validateEmail = useCallback((email, element) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/gi;
        return emailRegex.test(email) ? true : setWarning(element, "Invalid email address")
    }, [setWarning])

    const validateForm = useCallback((form) => {
        let unFilledInputs = Array.from(form.elements).map(item => item.value ? item.value.length === 0 ? item : "" : item).filter(item => item !== "" && item.type !== "submit" && item.type !== "file" && item.type !== "button")
        document.querySelectorAll(".Form__warning").forEach(el => el.innerHTML = "");
        if (unFilledInputs.length === 0) {
            if (type !== "log") {
                if (form.password.value !== form.passwordConfirm.value) {
                    setWarning(form.passwordConfirm, "Password does not match")
                    return false
                } else {
                    let passwordValidity = validatePassword(form.password.value, form.password);
                    if (passwordValidity) {
                        let emailValidity = validateEmail(form.email.value, form.email)
                        if (emailValidity) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                }
            } else {
                let emailValidity = validateEmail(form.email.value, form.email)
                if (emailValidity) {
                    return true
                } else {
                    return false
                }
            }
        } else {
            unFilledInputs.forEach(element => {
                setWarning(element, "Fill this gap")
            })
            return false
        }
    }, [setWarning, type, validateEmail, validatePassword])

    const submitHandler = useCallback((e) => {
        e.preventDefault();
        let res = validateForm(e.target);
        if (res) {
            
            if (type !== "log") {
                let formData = new FormData();
                if (e.target.avatar.files[0]) formData.append("avatar", e.target.avatar.files[0], e.target.avatar.files[0].name);
                formData.append("name", e.target.name.value);
                formData.append("email", e.target.email.value);
                formData.append("password", e.target.password.value);
                fetch(`https://brain-battle-server-wpcm.onrender.com/auth/register`, {
                    method: `POST`,
                    body: formData
                })
                    .then(res => res.json())
                    .then(data => {
                        e.target.reset()
                        if (data.status === "ok") {
                            localStorage.setItem("userToken", data.token)
                            fetch(`https://brain-battle-server-wpcm.onrender.com/db/getUserInfo`, {
                                headers: { "Authorization": `Baerer ${data.token}` }
                            })
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data);
                                    setLogined(true)
                                    setInvokeStatus(!invokeStatus)
                                    alert("Successfully registered! Other functionality in development. Note that your account can be removed because of developing")
                                })
                                .catch(e => console.log(e))
                        } else if (data.exist) {
                            setWarning(e.target.email, "User with the same email already exist")
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                let data = {
                    email: e.target.email.value,
                    password: e.target.email.value
                }
                fetch(`https://brain-battle-server-wpcm.onrender.com/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(res=>res.json())
                .then(data=>{
                    localStorage.setItem("userToken", data.token);
                    setLogined(true)
                    setInvokeStatus(!invokeStatus)
                    alert("Logged in. Other functionality in development. Note that your account can be removed because of developing")
                })
                .catch(e=>console.log(e))
            }
        }
        return false
    }, [validateForm, setWarning, type, setLogined, invokeStatus, setInvokeStatus])

    return (
        <form onSubmit={submitHandler} className="Form">
            <div className="Form__content-container">
                <h2 className="Form__headline">{(type === "reg" ? "Create an account" : "Log in")}</h2>
                <div className="Form__fields">
                    <a href="https://brain-battle-server-wpcm.onrender.com/auth/google" className="Form__button"> <img className="Form__btn-icon" height={25} src={googleIcon} alt="google icon" />Continue with Google</a>
                    {
                        (type === "log") ? <>
                            <div className="Form__fields-container">
                                <div className="Form__text-inputs">
                                    <FormInput label="Email" {...{ inputFocusHandler, inputBlurHandler }} type="text" name="email" />
                                    <FormInput label="Password" {...{ inputFocusHandler, inputBlurHandler }} type="password" name="password" />
                                </div>
                            </div>
                        </> : <>
                            <div className="Form__fields-container">
                                <div className="Form__input-container Form__input-container_image">
                                    <div className="Form__avatar-template">
                                        <img src={imagePreview ? imagePreview : avatarDef} alt="avatar" className="Form__avatar-preview" />
                                    </div>
                                    <div className="Form__info">Note, max size of your image must be 1.5MB</div>
                                    <label htmlFor="form-avatar" className="Form__label Form__label_file"><img height={25} width={25} src={imageUpload} alt="" />Set profile image</label>
                                    <p className="Form__warning"></p>
                                    <input onChange={avatarChangeHandler} id="form-avatar" type="file" name="avatar" className="Form__input Form__input_file" />
                                </div>
                                <div className="Form__text-inputs">
                                    <FormInput label="Your beautiful name" {...{ inputFocusHandler, inputBlurHandler }} type="text" name="name" />
                                    <FormInput label="Email" {...{ inputFocusHandler, inputBlurHandler }} type="text" name="email" />
                                    <FormInput label="Set strong password" {...{ inputFocusHandler, inputBlurHandler }} type="password" name="password" />
                                    <FormInput label="Confirm password" {...{ inputFocusHandler, inputBlurHandler }} type="password" name="passwordConfirm" />
                                </div>
                            </div>
                        </>
                    }
                    <button className="Form__submit" type="submit">{(type === "reg" ? "Sign up" : "Sign in")}</button>
                </div>
            </div>
        </form>
    )
}

export default Form

