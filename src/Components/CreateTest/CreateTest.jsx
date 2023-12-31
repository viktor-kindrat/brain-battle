import "./Styles/CareateTest.css"

import addIcon from "./Svg/add.svg"
import saveIcon from "./Svg/save.svg";

import { useNavigate } from "react-router-dom";
import { useReducer, useEffect } from "react"
import quesReducer from "./Reducers/questionsReducer";

import { gsap } from "gsap";
import QuestionField from "../QuestionField/QuestionField";


function CreateTest({ sessionExpired, logined, setLogined, setInvokeStatus, setUserData, invokeStatus }) {
    let navigate = useNavigate()

    let [questions, questionsDispatch] = useReducer(quesReducer, JSON.parse(sessionStorage.getItem("questions")) || [{
        text: "Question 0",
        variants: [{ text: "Variant 0", right: false }]
    }])

    const addQuestionHandler = async (e) => {
        await questionsDispatch({
            type: "question/addQuestion"
        })
        
        gsap.fromTo(".QuestionField_anime", {
            x: -50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "elastic.out"
        })
    }

    const saveTestHandler = (e) => {
        let createTestFrom = document.querySelector(".CreateTest");
        let data = {
            id: parseInt(new Date().getTime() + Math.floor(Math.random() * 20000).toString()).toString("32"),
            name: createTestFrom.querySelector("#CreateTest-name-field").value,
            description: createTestFrom.querySelector("#CreateTest-description-field").value,
            testings: [],
            questions: questions
        }
        if (data.name.length >= 3 && data.name.length <= 100) {
            if (data.description.length > 0 && data.description.length < 450) {
                let withEmptyFields = data.questions.filter((item, index) => (item.text.length === 0) || (item.variants.filter(variant => variant.text.length === 0).length !== 0) || (item.variants.filter(variant => variant.right === true).length === 0))
                if (withEmptyFields.length === 0) {

                    const userToken = localStorage.getItem("userToken");

                    fetch("https://brain-battle-server-wpcm.onrender.com/db/recordTest", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${userToken}`
                        },
                        body: JSON.stringify(data)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.status === "ok") {
                                setInvokeStatus(!invokeStatus);
                                setUserData({});
                                sessionStorage.clear();
                                navigate("/dashboard");
                            }
                            if (data.message === "Invalid token") {
                                sessionExpired()
                            }
                        })
                        .catch(e => {
                            console.log(e)
                        })
                } else {
                    console.log("You have an empty fields")
                }
            } else {
                console.log("Description must have at least 3 symbols and no more than 100 symbols")
            }
        } else {
            console.log("Name must have at least 3 symbols and no more than 100 symbols")
        }
    }

    useEffect(()=>{
        gsap.fromTo(".CreateTest__move", {
            x: -50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "elastic.out",
            stagger: 0.1
        })
    }, [])

    return (
        <section className="CreateTest">
            <div className="CreateTest__headline-group CreateTest__move">
                <h2 className="CreateTest__headline">Create new test</h2>
                <button onClick={saveTestHandler} className="CreateTest__save-btn"><img src={saveIcon} alt="save" />Save</button>
            </div>
            <div className="CreateTest__group CreateTest__move">
                <input id="CreateTest-name-field" className="CreateTest__name" type="text" placeholder="Name of the test here*" defaultValue="Untitled" />
                <textarea id="CreateTest-description-field" className="CreateTest__decription" placeholder="Description*" defaultValue="My best test"></textarea>
            </div>
            <div className="CreateTest__questions CreateTest__move">
                <h3 className="CreateTest__headline CreateTest__headline_3">Questions</h3>
                <div className="CreateTest__questions-container">
                    {
                        questions.map((question, id) =>
                            <QuestionField key={id} {...{ id, question, questions, questionsDispatch }} />
                        )
                    }
                </div>
                <button onClick={addQuestionHandler} className="CreateTest__questions-button CreateTest__move"><img height={20} src={addIcon} alt="add" />Add more question</button>
            </div>
        </section>
    )
}
export default CreateTest