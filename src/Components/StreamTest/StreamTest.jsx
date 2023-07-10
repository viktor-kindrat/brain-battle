import "./Styles/StreamTest.css"
import playIcon from "./Svg/play.svg"
import nextIcon from "./Svg/next.svg"

import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"

import socket from "../../Socket"

import { gsap } from "gsap"

function StreamTest({sessionExpiered, logined, setLogined, invokeStatus, userData, setUserData, setInvokeStatus }) {
    let navigate = useNavigate();

    let [pending, setPending] = useState(true);
    let [roomId, setRoomId] = useState(null);
    let [testData, setTestData] = useState({
        code: roomId,
        questions: userData.tests.filter(test => test.id === window.location.hash.substring(1))[0].questions,
        respondents: [],
        questionId: -1
    })
    let [answers, setAnswers] = useState(0);
    let [showLeaderboard, setShowLeaderboard] = useState(false);
    let [leaderboardPending, setLeaderboardPending] = useState(true);
    let [testPending, setTestPending] = useState(true)

    useEffect(()=>{
        socket.connect();
    }, [])

    useEffect(()=>{
        gsap.fromTo(".StreamTest__user", {
            scale: 0,
        }, {
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "elastic.out"
        })
    }, [testData.respondents])

    let getFullTestingInfo = useCallback((testingCode) => {
        fetch("https://brain-battle-server-wpcm.onrender.com/tester/getFullTestingData", { method: "POST", headers: { "Content-type": "application/json", "Authorization": `Baerer ${localStorage.getItem("userToken")}` }, body: JSON.stringify({ code: testingCode }) })
            .then(res => res.json())
            .then(data => {
                if (data.status === "ok") {
                    setTestData(data.data);
                    setLeaderboardPending(false)
                    setTestPending(false)
                } else {
                    sessionExpiered()
                    socket.disconnect()
                }
            })
            .catch(e => console.log(e))
    }, [sessionExpiered])

    let startTesting = useCallback((testingCode, id) => {
        setPending(true)
        if (testingCode) {
            fetch(`https://brain-battle-server-wpcm.onrender.com/tester/createTest`, { method: "POST", headers: { "Content-type": "application/json", "Authorization": `Baerer ${localStorage.getItem("userToken")}` }, body: JSON.stringify({ code: testingCode, testId: id }) })
                .then(res => res.json())
                .then(data => {
                    if (data.status === "ok") {
                        socket.emit("create-testing-room", testingCode)
                        socket.on("created-testing-room", (e) => {
                            setPending(false)
                            setRoomId(testingCode)
                        })
                        socket.on("joined-testing-room", (e) => {
                            getFullTestingInfo(testingCode)
                        })
                        socket.on("user-disconnected", (disconnectedName) => {
                            fetch("https://brain-battle-server-wpcm.onrender.com/tester/removeRespondent", { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify({ code: testingCode, name: disconnectedName }) })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.status === "ok") {
                                        getFullTestingInfo(testingCode);
                                    }
                                })
                                .catch(e => console.log(e))
                        })
                    } else {
                        sessionExpiered()
                        socket.disconnect()
                    }
                })
                .catch(e => console.log(e))
        }
    }, [getFullTestingInfo, sessionExpiered]);

    socket.on("answer-setted", () => {
        setAnswers(answers + 1)
    })

    let switchQuestionHandler = useCallback((testingCode) => {
        if (parseInt(testData.questionId) + 1 < testData.questions[0].length) {
            fetch("https://brain-battle-server-wpcm.onrender.com/tester/switchQuestion", { method: "POST", headers: { "Content-type": "application/json", "Authorization": `Baerer ${localStorage.getItem("userToken")}` }, body: JSON.stringify({ code: testingCode }) })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.status === "ok") {
                        getFullTestingInfo(testingCode)
                        setAnswers(0)
                        socket.emit("switch-question", testingCode)
                    } else {
                        sessionExpiered()
                        socket.disconnect()
                    }
                })
                .catch(e => console.log(e))
        } else {
            getFullTestingInfo(testingCode)
        }
    }, [getFullTestingInfo, testData, setAnswers, sessionExpiered])

    let setFirstQuestionHandler = useCallback((e) => {
        if (testData.respondents.length > 0) {
            switchQuestionHandler(roomId)
        }
    }, [switchQuestionHandler, roomId, testData])

    useEffect(() => {
        if (!window.location.hash || !logined) {
            navigate("/dashboard")
        } else {
            let testId = window.location.hash.substring(1);
            let testingCode = parseInt(parseInt(new Date().getTime()) + Math.floor(Math.random() * 10000)).toString("36");
            startTesting(testingCode, testId)
        }
    }, [navigate, logined, startTesting]);

    let handleLeaderboard = useCallback(() => {
        setShowLeaderboard(true)
        setLeaderboardPending(true);
        getFullTestingInfo(roomId);
    }, [getFullTestingInfo, roomId, setShowLeaderboard, setLeaderboardPending]);

    let handleLeaderboardBtn = useCallback(() => {
        if (parseInt(testData.questionId) + 1 < testData.questions[0].length) {
            setShowLeaderboard(false)
            setTestPending(true)
            switchQuestionHandler(roomId)
        } else {
            socket.emit("test-ended", roomId);
            setTimeout(() => {
                fetch("https://brain-battle-server-wpcm.onrender.com/tester/removeTest", { method: "POST", headers: { "Content-type": "application/json", "Authorization": `Baerer ${localStorage.getItem("userToken")}` }, body: JSON.stringify({ code: roomId }) })
                    .then(res => res.json())
                    .then(data => {
                        if (data.status === "ok") {
                            navigate("/dashboard")
                            setInvokeStatus(!invokeStatus)
                        } else {
                            sessionExpiered()
                            socket.disconnect()
                        }
                    })
                    .catch(e => console.log(e))
            }, 5000);
        }
    }, [roomId, setShowLeaderboard, switchQuestionHandler, setTestPending, setInvokeStatus, invokeStatus, navigate, testData, sessionExpiered])

    return (
        <section className="StreamTest">
            {
                testData && parseInt(testData.questionId) === -1 ? <>
                    <div className="StreamTest__head">
                        <h2 className="StreamTest__name">{userData.tests.filter(test => test.id === window.location.hash.substring(1))[0].name}</h2>
                        <div className="StreamTest__code">Testing code: <span className="StreamTest__code-val">{pending ? "Loading" : roomId}</span></div>
                    </div>
                    <div className="StreamTest__waiting-hall">
                        <h2 className="StreamTest__headline">Waiting for all members</h2>
                        <button onClick={setFirstQuestionHandler} className="StreamTest__play-btn"><img height={35} src={playIcon} alt="play" className="StreamTest__play-btn-image" /></button>
                        <div className="StreamTest__users">
                            {
                                testData && testData.respondents.length > 0 ? testData.respondents.map(item =>
                                    <div className="StreamTest__user">{item.name}</div>
                                ) : "Anyone is connected"
                            }
                        </div>
                    </div>
                </> : (showLeaderboard) ? <>
                    <div className="StreamTest__leaderboard">
                        <h2 className="StreamTest__headline">Leaderboard</h2>
                        <div className="StreamTest__leaders-container">
                            {
                                (!leaderboardPending) ? testData.respondents.sort((a, b) => b.answers.reduce((accumulator, item) => item === "true" ? accumulator + 1 : accumulator, 0) - a.answers.reduce((accumulator, item) => item === "true" ? accumulator + 1 : accumulator, 0)).map((resp, index) => {
                                    return (
                                        <div className="StreamTest__leader">
                                            <div className="StreamTest__leader-name">{index + 1}. {resp.name}</div>
                                            <div className="StreamTest__leader-result">
                                                {
                                                    resp.answers.reduce((accumulator, item) => item === "true" ? accumulator + 1 : accumulator, 0)
                                                }
                                            </div>
                                        </div>
                                    )

                                }) : "Loading leaders"
                            }
                        </div>
                        <button onClick={handleLeaderboardBtn} className="StreamTest__next-btn"><img src={nextIcon} height={25} alt="next" /></button>
                    </div>
                </> : <>
                    {
                        (!testPending) ? <>
                            <div className="StreamTest__question-head">
                                <div className="StreamTest__question-head-info">
                                    <div className="StreamTest__count-answers">Answers: {answers}</div>
                                    <button onClick={handleLeaderboard} className="StreamTest__button">Skip <img className="StreamTest__button-icon" height={20} src={nextIcon} alt="next" /></button>
                                </div>
                                <h2 className="StreamTest__question">{testData.questions[0][testData.questionId].text}</h2>
                            </div>
                            <div className="StreamTest__variants">
                                {testData.questions[0][testData.questionId].variants.map((item, index) =>
                                    <div className="StreamTest__variant"><div className="StreamTest__variant-index">{index}</div> {item.text}</div>
                                )}
                            </div>
                        </> : "Pending"
                    }
                </>
            }
        </section>
    )
}

export default StreamTest