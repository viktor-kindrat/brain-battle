import "./Styles/QuestionField.css"

import deleteIcon from "./Svg/trash.svg"
import addIcon from "./Svg/add.svg"

import QuestionVariant from "../QuestionVariant/QuestionVariant"

import { gsap } from "gsap"

function QuestionField({ id, questions, question, questionsDispatch }) {
    const changeQuestionHandler = (e) => {
        questionsDispatch({
            type: "question/change",
            id: e.target.parentElement.parentElement.dataset.id,
            value: e.target.value
        })
    }

    const removeQuestionHandler = async(e) => {
        await e.target.parentElement.parentElement.classList.add("QuestionField_anime-remove");
        await gsap.fromTo(".QuestionField_anime-remove", {
            opacity: 1,
            x: 0
        }, {
            opacity: 0,
            x: -50,
            duration: 0.7,
            ease: "elastic.out"
        })
        questionsDispatch({
            type: "question/remove",
            id: e.target.parentElement.parentElement.dataset.id
        })
    }

    const addVariantHandler = async(e) => {
        await questionsDispatch({
            type: "variant/addVariant",
            id: e.target.parentElement.dataset.id
        })
        document.querySelectorAll(".QuestionVariant_anime")?.forEach(el=>el?.classList.remove("QuestionVariant_anime"));
        await e.target.parentElement?.querySelector(".QuestionVariant:last-child")?.classList.add("QuestionVariant_anime")
        gsap.fromTo(".QuestionVariant_anime", {
            x: -50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "elastic.out"
        })
    }

    return (
        <div className={(id + 1) === questions.length ? `QuestionField QuestionField_anime` : `QuestionField`} data-id={id}>
            <div className="QuestionField__head">
                <input onChange={changeQuestionHandler} className="QuestionField__input" type="text" value={question.text} placeholder="Ask respondents about something" />
                <button onClick={removeQuestionHandler} className="QuestionField__delete"><img className="QuestionField__delete-icon" height={25} src={deleteIcon} alt="remove" /></button>
            </div>
            <div className="CreateTest__questions-variants">
                {question.variants.map((item, index) => <QuestionVariant key={index} {...{ questionsDispatch, item, index, id }} variants={question.variants} />)}
            </div>
            <button className="CreateTest__questions-variants-button" onClick={addVariantHandler}> <img src={addIcon} alt="add" />More variant</button>
        </div>
    )
}

export default QuestionField