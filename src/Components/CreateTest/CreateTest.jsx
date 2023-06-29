import "./Styles/CareateTest.css"

import addIcon from "./Svg/add.svg"

import { useReducer } from "react"
import quesReducer from "./Reducers/questionsReducer";

import QuestionField from "../QuestionField/QuestionField";


function CreateTest({ logined, setLogined }) {
    let [questions, questionsDispatch] = useReducer(quesReducer, [{
        text: "Question 0",
        variants: [{ text: "Variant 0", right: false }]
    }])

    const addQuestionHandler = (e) => {
        questionsDispatch({
            type: "question/addQuestion"
        })
    }

    return (
        <section className="CreateTest">
            <h2 className="CreateTest__headline">Create new test</h2>
            <div className="CreateTest__group">
                <input className="CreateTest__name" type="text" placeholder="Name of the test here*"  defaultValue="Untitled" />
                <textarea className="CreateTest__decription" placeholder="Description*" defaultValue="My best test"></textarea>
            </div>
            <div className="CreateTest__questions">
                <h3 className="CreateTest__headline CreateTest__headline_3">Questions</h3>
                <div className="CreateTest__questions-container">
                    {
                        questions.map((question, id) =>
                            <QuestionField  key={id} {...{id, question, questionsDispatch}} />
                        )
                    }
                </div>
                <button onClick={addQuestionHandler} className="CreateTest__questions-button"><img height={20} src={addIcon} alt="add" />Add more question</button>
            </div>
        </section>
    )
}
export default CreateTest