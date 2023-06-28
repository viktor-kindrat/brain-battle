import { useReducer } from "react"
import quesReducer from "./Reducers/questionsReducer";

import "./Styles/CareateTest.css"

function CreateTest({ logined, setLogined }) {
    let [questions, questionsDispatch] = useReducer(quesReducer, [{
        text: "Question 0",
        variants: [{ text: "Variant 0", right: false }]
    }])

    const addVariantHandler = (e) => {
        questionsDispatch({
            type: "addVariant",
            id: e.target.parentElement.dataset.id
        })
    }

    const changeVariantHandler = (e)=>{
        questionsDispatch({
            type: "changeVariant",
            id: e.target.parentElement.parentElement.parentElement.dataset.id,
            index: e.target.parentElement.dataset.index,
            value: e.target.value
        })
    }
    
    const setTrueHanler = (e)=>{
        questionsDispatch({
            type: "setVariantTrue",
            id: e.target.parentElement.parentElement.parentElement.dataset.id,
            index: e.target.parentElement.dataset.index,
        })
    }

    const deleteVariantHandler = (e)=>{
        questionsDispatch({
            type: "deleteVariant",
            id: e.target.parentElement.parentElement.parentElement.dataset.id,
            index: e.target.parentElement.dataset.index,
        })
    }

    return (
        <section className="CreateTest">
            <h2 className="CreateTest__headline">Create new test</h2>
            <div className="CreateTest__group">
                <input className="CreateTest__name" type="text" defaultValue="Untitled" />
                <textarea className="CreateTest__decription">My best test</textarea>
            </div>
            <div className="CreateTest__questions">
                <h3 className="CreateTest__headline CreateTest__headline_3">Questions</h3>
                <div className="CreateTest__questions-container">
                    {
                        questions.map((question, id) =>
                            <div className="CreateTest__question" data-id={id}>
                                <div className="CreateTest__question-head">
                                    <input className="CreateTest__questions-input" type="text" value={question.text} placeholder="Enter the question" />
                                    <button className="CreateTest__question-delete">remove</button>
                                </div>
                                <div className="CreateTest__questions-variants">
                                    {
                                        question.variants.map((item, index) =>
                                            <div className="CreateTest__questions-variant" data-index={index}>
                                                <input onChange={setTrueHanler} className="CreateTest__variant-checkbox" value={item.right} type="radio" name={`rightAnswer${id}`} />
                                                <input onChange={changeVariantHandler} className="CreateTest__variant-field" type="text" value={item.text} placeholder="Enter the value" />
                                                <button onClick={deleteVariantHandler} className="CreateTest__remove-variant-btn">Remove</button>
                                            </div>
                                        )
                                    }
                                </div>
                                <button className="CreateTest__questions-variants-button" onClick={addVariantHandler}>Add more variants</button>
                            </div>
                        )
                    }
                </div>
                <button className="CreateTest__questions-button">Add more question</button>
            </div>
        </section>
    )
}
export default CreateTest