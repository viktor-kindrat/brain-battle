import "./Styles/Form.css"

import FormInput from "./FormInput"

import { useState, useCallback } from "react"

import googleIcon from "./Svg/google.svg"
import avatarDef from "./Svg/avatardef.svg"
import imageUpload from "./Svg/addImage.svg"

function Form({ type }) {
    let [imagePreview, setImagePreview] = useState("");

    let setWarning = useCallback((el, text) => {
        el.parentElement.querySelector(".Form__warning").innerHTML = text
    }, [])

    let avatarChangeHandler = useCallback((e) => {
        if (e.target.files[0]) {
            if ((e.target.files[0].size * (10 ** (-6))) <= 1.5) {
                let url = URL.createObjectURL(e.target.files[0])
                setWarning(e.target, "")
                setImagePreview(url)
            } else {
                setWarning(e.target, "Your image size is too big. Maximum size is 1.5MB Please compress image and try again!")
                setImagePreview(avatarDef)
            }
        }
    }, [setWarning])

    let inputFocusHandler = useCallback((e) => {
        let label = e.target.parentElement.querySelector(".Form__label");
        label.style.top = "-3px";
        label.style.fontSize = "10px";
        label.style.fontWeight = "800"
        label.style.color = "#333333"
    }, [])

    let inputBlurHandler = useCallback((e) => {
        if (e.target.value === "") e.target.parentElement.querySelector(".Form__label").removeAttribute("style")
    }, [])

    let validateForm = useCallback((form) => {
        let unFilledInputs = Array.from(form.elements).map(item => item.value ? item.value.length === 0 ? item : "" : item).filter(item => item !== "" && item.type !== "submit" && item.type !== "file")
        document.querySelectorAll(".Form__warning").forEach(el => el.innerHTML = "");
        if (unFilledInputs.length === 0) {
            if (type !== "log") {
                if (form.password.value !== form.passwordConfirm.value) {
                    setWarning(form.passwordConfirm, "Password does not match")
                    return false
                }
            }
        } else {
            unFilledInputs.forEach(element => {
                setWarning(element, "Fill this gap")
            })
            return false
        }
    }, [setWarning, type])

    let submitHandler = useCallback((e) => {
        e.preventDefault();
        let res = validateForm(e.target);
        console.log(res)
        return false
    }, [validateForm])

    return (
        <form onSubmit={submitHandler} className="Form">
            <div className="Form__content-container">
                <h2 className="Form__headline">{(type === "reg" ? "Create an account" : "Log in")}</h2>
                <div className="Form__fields">
                    <a href="https://brain-battle-server-wpcm.onrender.com/auth/google" className="Form__button"> <img className="Form__btn-icon" height={25} src={googleIcon} alt="google icon" />Continue with Google</a>
                    {
                        (type === "log") ? <>
                            <div className="Form__fields-container">
                                <FormInput label="Email" {...{ inputFocusHandler, inputBlurHandler }} type="text" name="email" />
                                <FormInput label="Password" {...{ inputFocusHandler, inputBlurHandler }} type="password" name="password" />
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
                                <FormInput label="Your beautiful name" {...{ inputFocusHandler, inputBlurHandler }} type="text" name="name" />
                                <FormInput label="Email" {...{ inputFocusHandler, inputBlurHandler }} type="text" name="email" />
                                <FormInput label="Password" {...{ inputFocusHandler, inputBlurHandler }} type="password" name="password" />
                                <FormInput label="Confirm password" {...{ inputFocusHandler, inputBlurHandler }} type="password" name="passwordConfirm" />
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

