import "./Styles/StreamTest.css"

import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import socket from "../../Socket"

function StreamTest({logined, setLogined, invokeStatus, userData, setUserData, setInvokeStatus}){
    let navigate = useNavigate();

    let [pending, setPending] = useState(true);
    let [roomId, setRoomId] = useState(null)

    let startTesting = (testingCode, id)=>{
        setPending(true)
        if (testingCode) {
            fetch(`https://brain-battle-server-wpcm.onrender.com/tester/createTest`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Baerer ${localStorage.getItem("userToken")}`
                },
                body: JSON.stringify({
                    code: testingCode,
                    testId: id
                })
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.status === "ok") {
                    socket.emit("create-testing-room", testingCode)
                    socket.on("created-testing-room", (e)=>{
                        setPending(false)
                        setRoomId(testingCode)
                    })
                }
            })
            .catch(e=>console.log(e))
        }
    }

    useEffect(()=>{
        if (!window.location.hash || !logined) {
            navigate("/dashboard")
        } else {
            let testId = window.location.hash.substring(1);
            let userToken = localStorage.getItem("userToken");
            let testingCode = parseInt(parseInt(new Date().getTime()) + Math.floor(Math.random() * 10000)).toString("36");
            startTesting(testingCode, testId)
            console.log(`Test id: ${testId}\n\nUser token: ${userToken}\n\nTesting code is: "${testingCode}"`)
        }
    }, [navigate, logined]);

    return (
        <section className="StreamTest">
            <div className="StreamTest__head">
                <h2 className="StreamTest__name">{userData.tests.filter(test=>test.id === window.location.hash.substring(1))[0].name}</h2>
                <div className="StreamTest__code">Testing code: <span className="StreamTest__code-val">{pending ? "Loading" : roomId}</span></div>
            </div>
            <div className="StreamTest__waiting-hall">
                <h2 className="StreamTest__headline">Waiting for all members</h2>
            </div>
        </section>
    )
}

export default StreamTest