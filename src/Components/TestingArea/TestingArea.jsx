import "./Styles/TestingArea.css"

import { useEffect } from "react"

import socket from "../../Socket"

function TestingArea (){
    useEffect(()=>{
        const testInfo = JSON.parse(sessionStorage.getItem("testing")) || false;
        socket.emit("join-testing-room", testInfo.code);
        socket.emit("set-username", testInfo.name);
        socket.emit("joined-new-user", testInfo.code);
        socket.on("joined-testing-room", (e)=>console.log(e))
    }, [])

    return (
        <section className="TestingArea">
            <div className="TestingArea__wait">
                <span className="TestingArea__loader"></span>
                <h2 className="TestingArea__headline">Concentrate! Your test will be satrted in a few minutes</h2>
            </div>
        </section>
    )
}

export default TestingArea