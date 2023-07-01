import "./Styles/StreamTest.css"
import playIcon from "./Svg/play.svg"

import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"

import socket from "../../Socket"

function StreamTest({ logined, setLogined, invokeStatus, userData, setUserData, setInvokeStatus }) {
    let navigate = useNavigate();

    let [pending, setPending] = useState(true);
    let [roomId, setRoomId] = useState(null);
    let [testData, setTestData] = useState({
        code: roomId,
        questions: userData.tests.filter(test => test.id === window.location.hash.substring(1))[0].questions,
        respondents: [],
        questionId: -1
    })

    let getFullTestingInfo = useCallback((testingCode) => {
        fetch("https://brain-battle-server-wpcm.onrender.com/tester/getFullTestingData", { method: "POST", headers: { "Content-type": "application/json", "Authorization": `Baerer ${localStorage.getItem("userToken")}` }, body: JSON.stringify({ code: testingCode }) })
            .then(res => res.json())
            .then(data => {
                setTestData(data.data)
            })
            .catch(e => console.log(e))
    }, [])

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
                                        getFullTestingInfo(testingCode)
                                    }
                                })
                                .catch(e => console.log(e))
                        })
                    }
                })
                .catch(e => console.log(e))
        }
    }, [getFullTestingInfo])

    useEffect(() => {
        if (!window.location.hash || !logined) {
            navigate("/dashboard")
        } else {
            let testId = window.location.hash.substring(1);
            let testingCode = parseInt(parseInt(new Date().getTime()) + Math.floor(Math.random() * 10000)).toString("36");
            startTesting(testingCode, testId)
        }
    }, [navigate, logined, startTesting]);

    return (
        <section className="StreamTest">
            <div className="StreamTest__head">
                <h2 className="StreamTest__name">{userData.tests.filter(test => test.id === window.location.hash.substring(1))[0].name}</h2>
                <div className="StreamTest__code">Testing code: <span className="StreamTest__code-val">{pending ? "Loading" : roomId}</span></div>
            </div>
            <div className="StreamTest__waiting-hall">
                <h2 className="StreamTest__headline">Waiting for all members</h2>
                <button className="StreamTest__play-btn"><img height={35} src={playIcon} alt="play" className="StreamTest__play-btn-image" /></button>
                <div className="StreamTest__users">
                    {
                        testData && testData.respondents.length > 0 ? testData.respondents.map(item =>
                            <div className="StreamTest__user">{item.name}</div>
                        ) : "Anyone is connected"
                    }
                </div>
            </div>
        </section>
    )
}

export default StreamTest