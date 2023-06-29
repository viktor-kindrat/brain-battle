import viewPasswordIcon from "./Svg/eye.svg"

function FormInput({ label, inputFocusHandler, inputBlurHandler, type, name }) {
    const showPassword = (e) => {
        let inp = e.target.parentElement.querySelector(".Form__input");
        inp.type = inp.type === "text" ? "password" : "text"
        console.log(inp)
    }
    return (
        <div className="Form__input-container">
            <label htmlFor={`form-${name}`} className="Form__label">{label}</label>
            <input onFocus={inputFocusHandler} onBlur={inputBlurHandler} id={`form-${name}`} type={type} name={name} className="Form__input" />
            {
                type === "password" ? <button onClick={showPassword} type="button" className="From__show-password"><img height={25} src={viewPasswordIcon} alt="view" /></button> : ""
            }
            <p className="Form__warning"></p>
        </div>
    )
}

export default FormInput