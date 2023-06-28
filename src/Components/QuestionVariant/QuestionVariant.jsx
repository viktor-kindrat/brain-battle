import "./Styles/QuestionVariant.css"

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
        <div key={index} className="CreateTest__questions-variant" data-index={index}>
            <input onChange={setTrueHanler} className="CreateTest__variant-checkbox" value={item.right} type="radio" name={`rightAnswer${id}`} />
            <input onChange={changeVariantHandler} className="CreateTest__variant-field" type="text" value={item.text} placeholder="Enter the value" />
            <button onClick={deleteVariantHandler} className="CreateTest__remove-variant-btn">Remove</button>
        </div>
    )
}


export default QuestionVariant