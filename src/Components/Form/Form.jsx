import "./Styles/Form.css"

import { useState } from "react"

import googleIcon from "./Svg/google.svg"
import avatarDef from "./Svg/avatardef.svg"

function Form({ type }) {
    let [imagePreview, setImagePreview] = useState("");
    let avatarChangeHandler = (e)=>{
        let url = URL.createObjectURL(e.target.files[0])
        setImagePreview(url)
    }
    return (
        <form action="" className="Form">
            <div className="Form__content-container">
                <h2 className="Form__headline">{(type === "reg" ? "Create an account" : "Log in")}</h2>
                <div className="Form__fields">
                    <a href="https://brain-battle-server-wpcm.onrender.com/auth/google" className="Form__button"> <img className="Form__btn-icon" height={25} src={googleIcon} alt="google icon" />Continue with Google</a>
                    {
                        (type === "log") ? <>
                            <div className="Form__fields-container">
                                <div className="Form__input-container">
                                    <label htmlFor="form-email" className="Form__label">Input your email</label>
                                    <input id="form-email" type="text" name="email" className="Form__input" />
                                </div>
                                <div className="Form__input-container">
                                    <label htmlFor="form-password" className="Form__label">Enter password</label>
                                    <input id="form-password" type="password" name="password" className="Form__input" />
                                </div>
                            </div>
                        </> : <>
                            <div className="Form__fields-container">
                                <div className="Form__input-container">
                                    <div className="Form__avatar-template">
                                        <img src={imagePreview ? imagePreview : avatarDef} alt="avatar" className="Form__avatar-preview" />
                                    </div>
                                    <label htmlFor="form-avatar" className="Form__label Form__label_file">Set profile image</label>
                                    <input onChange={avatarChangeHandler} id="form-avatar" type="file" name="avatar" className="Form__input Form__input_file" />
                                </div>
                                <div className="Form__input-container">
                                    <label htmlFor="form-email" className="Form__label">Input your email</label>
                                    <input id="form-email" type="text" name="email" className="Form__input" />
                                </div>
                                <div className="Form__input-container">
                                    <label htmlFor="form-password" className="Form__label">Enter password</label>
                                    <input id="form-password" type="password" name="password" className="Form__input" />
                                </div>
                                <div className="Form__input-container">
                                    <label htmlFor="form-password-confirmation" className="Form__label">Confirm password</label>
                                    <input id="form-password-confirmation" type="password" name="password" className="Form__input" />
                                </div>
                            </div>
                        </>
                    }
                    <button type="submit">{(type === "reg" ? "Sign up" : "Sign in")}</button>
                </div>
            </div>
        </form>
    )
}

export default Form

