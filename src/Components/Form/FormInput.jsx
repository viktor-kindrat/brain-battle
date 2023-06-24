function FormInput({label, inputFocusHandler, inputBlurHandler, type, name}) {
    return (
        <div className="Form__input-container">
            <label htmlFor={`form-${name}`} className="Form__label">{label}</label>
            <input onFocus={inputFocusHandler} onBlur={inputBlurHandler} id={`form-${name}`} type={type} name={name} className="Form__input" />
            <p className="Form__warning"></p>
        </div>
    )
}

export default FormInput