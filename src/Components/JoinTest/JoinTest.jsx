import "./Styles/JoinTest.css"

import joinIcon from "./Svg/join.svg"
import brainIcon from "../../Media/brain.svg"

import { useCallback, useRef, useState } from "react"

import { useNavigate } from "react-router-dom"

function JoinTest() {
    const navigate = useNavigate();
    const testingCode = useRef(null)
    let [status, setStatus] = useState(false);

    const handleJoin = useCallback((e) => {
        let value = e.target.parentElement.querySelector(".JoinTest__input").value;
        if (value.length > 3) {
            console.log(value)
            fetch("https://brain-battle-server-wpcm.onrender.com/tester/checkIfExist", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    code: value
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.data) {
                        setStatus(true)
                        testingCode.current = value;
                    } else {
                        console.log("Test does not exist")
                    }
                })
                .catch(e => console.log(e))
        }
    }, [])

    const handleEnterName = useCallback((e) => {
        const value = e.target.parentElement.querySelector(".JoinTest__input").value;

        if (value.length > 3) {
            fetch("https://brain-battle-server-wpcm.onrender.com/tester/addRespondent", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    code: testingCode.current,
                    name: value
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.status === "ok") {
                        e.target.parentElement.querySelector(".JoinTest__input").value = ""
                        sessionStorage.setItem("testing", JSON.stringify({
                            code: testingCode.current,
                            name: value
                        }))
                        navigate("/testing");
                    }
                })
                .catch(e => console.log(e))
        }
    }, [navigate])

    return (
        <section className="JoinTest">
            <div className="JoinTest__container">
                {
                    !status ? <>
                        <div className="JoinTest__headline-group">
                            <div className="JoinTest__headline-container">
                                <img height={100} className="JoinTest__logo" src={brainIcon} alt="logo" />
                                <h2 className="JoinTest__headline">Brain Battle</h2>
                            </div>
                            <p className="JoinTest__subheadline">Join the test</p>
                        </div>
                        <div className="JoinTest__input-group">
                            <input placeholder="Code" name="code" autoComplete="off" type="text" className="JoinTest__input" />
                            <button onClick={handleJoin} className="JoinTest__proceed-btn"> <img className="JoinTest__proceed-btn-icon" height={25} width={25} src={joinIcon} alt="join" /> Join</button>
                        </div>
                    </> : <>
                        <div className="JoinTest__headline-group">
                            <div className="JoinTest__headline-container">
                                <img height={100} className="JoinTest__logo" src={brainIcon} alt="logo" />
                                <h2 className="JoinTest__headline">Brain Battle</h2>
                            </div>
                            <p className="JoinTest__subheadline">Well done. Now create your username</p>
                        </div>
                        <div className="JoinTest__input-group">
                            <input placeholder="Username" name="username" type="text" className="JoinTest__input" />
                            <button onClick={handleEnterName} className="JoinTest__proceed-btn"> <img className="JoinTest__proceed-btn-icon" height={25} width={25} src={joinIcon} alt="join" /> Join</button>
                        </div>
                    </>
                }
            </div>
        </section>
    )
}
export default JoinTest