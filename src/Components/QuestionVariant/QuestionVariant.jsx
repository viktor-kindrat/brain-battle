import "./Styles/QuestionVariant.css"

import removeIcon from "./Svg/minus.svg"

function QuestionVariant({questionsDispatch, index, item, id}) {
    const changeVariantHandler = (e) => {
        questionsDispatch({
            type: "variant/changeVariant",
            id: e.target.parentElement.parentElement.parentElement.dataset.id,
            index: e.target.parentElement.dataset.index,
            value: e.target.value
        })
    }

    const setTrueHanler = (e) => {
        questionsDispatch({
            type: "variant/setVariantTrue",
            id: e.target.parentElement.parentElement.parentElement.dataset.id,
            index: e.target.parentElement.dataset.index,
        })
    }

    const deleteVariantHandler = (e) => {
        questionsDispatch({
            type: "variant/deleteVariant",
            id: e.target.parentElement.parentElement.parentElement.dataset.id,
            index: e.target.parentElement.dataset.index,
        })
    }
    return (
        <div className="QuestionVariant" data-index={index}>
            <input id={`idrightAnswer${index}withId${id}`} onChange={setTrueHanler} className="QuestionVariant__radio-input" value={item.right} checked={item.right} type="radio" name={`rightAnswer${id}`} />
            <label aria-label="radio button" className="QuestionVariant__radio" htmlFor={`idrightAnswer${index}withId${id}`}></label>
            <input onChange={changeVariantHandler} className="QuestionVariant__field" type="text" value={item.text} placeholder="Enter the value" />
            <button onClick={deleteVariantHandler} className="QuestionVariant__remove-variant-btn"><img className="QuestionVariant__remove-variant-btn-icon" height={20} src={removeIcon} alt="remove" /></button>
        </div>
    )
}


export default QuestionVariant