import { useReducer } from "react"
import quesReducer from "./Reducers/questionsReducer";

import QuestionField from "../QuestionField/QuestionField";

import "./Styles/CareateTest.css"

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
                <input className="CreateTest__name" type="text" defaultValue="Untitled" />
                <textarea className="CreateTest__decription" defaultValue="My best test"></textarea>
            </div>
            <div className="CreateTest__questions">
                <h3 className="CreateTest__headline CreateTest__headline_3">Questions</h3>
                <div className="CreateTest__questions-container">
                    {
                        questions.map((question, id) =>
                            <QuestionField {...{id, question, questionsDispatch}} />
                        )
                    }
                </div>
                <button onClick={addQuestionHandler} className="CreateTest__questions-button">Add more question</button>
            </div>
        </section>
    )
}
export default CreateTest