import "./Styles/QuestionField.css"

import deleteIcon from "./Svg/trash.svg"
import addIcon from "./Svg/add.svg"

import QuestionVariant from "../QuestionVariant/QuestionVariant"

function QuestionField({ id, question, questionsDispatch }) {
    const changeQuestionHandler = (e) => {
        questionsDispatch({
            type: "question/change",
            id: e.target.parentElement.parentElement.dataset.id,
            value: e.target.value
        })
    }

    const removeQuestionHandler = (e) => {
        questionsDispatch({
            type: "question/remove",
            id: e.target.parentElement.parentElement.dataset.id
        })
    }

    const addVariantHandler = (e) => {
        questionsDispatch({
            type: "variant/addVariant",
            id: e.target.parentElement.dataset.id
        })
    }

    return (
        <div className="QuestionField" data-id={id}>
            <div className="QuestionField__head">
                <input onChange={changeQuestionHandler} className="QuestionField__input" type="text" value={question.text} placeholder="Ask respondents about something" />
                <button onClick={removeQuestionHandler} className="QuestionField__delete"><img className="QuestionField__delete-icon" height={25} src={deleteIcon} alt="remove" /></button>
            </div>
            <div className="CreateTest__questions-variants">
                {question.variants.map((item, index) => <QuestionVariant key={index} {...{ questionsDispatch, item, index, id }} />)}
            </div>
            <button className="CreateTest__questions-variants-button" onClick={addVariantHandler}> <img src={addIcon} alt="add" />More variant</button>
        </div>
    )
}

export default QuestionField