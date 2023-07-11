import "./Styles/TestingArea.css"

import medalIcon from "./Svg/medalIcon.svg"

import { useEffect, useState, useCallback, useRef } from "react"

import { Link } from "react-router-dom";
import { gsap } from "gsap";

import socket from "../../Socket"

function TestingArea() {
    let [variantsCount, setVariantsCount] = useState([]);
    let [testStarted, setTestStarted] = useState(false);
    let [broken, setBroken] = useState(false);
    let [result, setResult] = useState({});
    useEffect(() => {
        socket.connect();
        return () => {
            socket.disconnect();
        }
    }, [])

    let [time, setTime] = useState(0);
    let [timeFalled, setTimeFalled] = useState(true);
    let timer = useRef(0);
    let x = useRef(null);
    let setupTimer = useCallback(() => {
        x.current = setInterval(() => {
            if (document.querySelector(".TestingArea__timer")) {
                gsap.fromTo(".TestingArea__timer", { scale: 0 }, { scale: 1, duration: 0.2 });
            }
            setTimeout(() => {
                if (document.querySelector(".TestingArea__timer")) {
                    gsap.fromTo(".TestingArea__timer", { scale: 1 }, { scale: 0, duration: 0.2 });
                }
            }, 950)
            if (timer.current === 0) {
                setTime(timer.current - 1);
                timer.current--
                clearInterval(x.current);
                x.current = null;
                setTimeFalled(true);
            } else {
                setTime(timer.current - 1)
                timer.current--
            }
        }, 1000)
    }, [setTime])


    useEffect(() => {
        let tl = gsap.timeline();
        if (document.querySelector(".TestingArea__wait")) {
            tl.fromTo(".TestingArea__wait", {
                scale: 0,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "elastic.out"
            })
        }
    }, [])

    useEffect(() => {
        if (document.querySelector(".TetstingArea__variant")) {
            setTimeout(() => {
                gsap.fromTo(".TetstingArea__variant", { scale: 0 }, { scale: 1, duration: 0.7, ease: "elastic.out", stagger: 0.1 })
            }, 0)
        }
    }, [timeFalled])

    useEffect(() => {
        const testInfo = JSON.parse(sessionStorage.getItem("testing")) || false;
        socket.emit("join-testing-room", testInfo.code);
        socket.emit("set-username", testInfo.name);
        socket.emit("joined-new-user", testInfo.code);
        socket.on("test-broken", (roomId) => {
            setBroken(true)
            socket.emit("leave", roomId)
        })
        socket.on("question-switched", (roomId) => {
            if (!x.current) {
                setTimeFalled(false);
                setTime(6);
                timer.current = 6;
                setupTimer();
            }
            console.log("Question switched")
            fetch("https://brain-battle-server-wpcm.onrender.com/tester/getQuestionsCount", { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify({ code: testInfo.code, name: testInfo.name }) })
                .then(res => res.json())
                .then(data => {
                    if (data.status === "ok") {
                        let newVariantsCount = [];
                        for (let i = 0; i < data.data; i++) {
                            newVariantsCount.push(i)
                        }
                        setVariantsCount(newVariantsCount)
                        setTestStarted(true)
                    }
                })
                .catch(e => console.log(e))
        })
        socket.on("test-finished", () => {
            fetch("https://brain-battle-server-wpcm.onrender.com/tester/getResult", { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify({ name: testInfo.name, code: testInfo.code }) })
                .then(res => res.json())
                .then(data => {
                    if (data.status === "ok") {
                        setResult(data.data)
                    } 
                })
                .catch(e => console.log(e))
        })
    }, [setVariantsCount, setBroken, setResult, setupTimer])

    let handleSetAnswer = useCallback((e) => {
        const testInfo = JSON.parse(sessionStorage.getItem("testing")) || false;
        const clickedId = e.target.dataset.id;
        fetch("https://brain-battle-server-wpcm.onrender.com/tester/setAnswer", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ name: testInfo.name, code: testInfo.code, answerId: clickedId })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === "ok") {
                    setTestStarted(false)
                    socket.emit("set-answer", testInfo.code)
                }
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <section className="TestingArea">
            {
                !result.score ? !broken ? !testStarted ? <div className="TestingArea__wait">
                    <span className="TestingArea__loader"></span>
                    <h2 className="TestingArea__headline">{
                        variantsCount.length === 0 ? "Concentrate! Your test will be satrted in a few minutes" : "Got your answer. Wait!"
                    }</h2>
                </div> : <>
                    <div className="TestingArea__variants">
                        <h2 className="TestingArea__headline">Choose correct answer</h2>
                        <div className="TestingArea__variants-container">
                            {
                                timeFalled ? variantsCount.map((item, index) =>
                                    <div key={index} onClick={handleSetAnswer} className="TetstingArea__variant" data-id={item}>{item}</div>
                                ) : <div className="TestingArea__timer">{time}</div>
                            }
                        </div>
                    </div>
                </> : <>
                    <div className="TestingArea__broken">
                        <h2 className="TestingArea__headline">Oooops! Test was broken by host</h2>
                        <Link to="/join">
                            <button className="TestingArea__broken-btn">Join by other code</button>
                        </Link>
                    </div>
                </> : <>
                    <div className="TestingArea__result">
                        <div className="TestingArea__result-medal">
                            <img height={250} src={medalIcon} alt="medal" />
                            <p className="TestingArea__result-place">{result.place}</p>
                        </div>
                        <h2 className="TestingArea__headline">Congratulations! You had finished your test</h2>
                        <div className="TestingArea__result-block">You had scored <span className="TestingArea__result-block_wide">{result.score} points</span>  in this game</div>
                    </div>
                </>
            }
        </section>
    )
}

export default TestingArea