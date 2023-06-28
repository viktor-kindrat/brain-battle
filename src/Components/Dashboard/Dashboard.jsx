import "./Styles/Dashboard.css"
import { useState, useEffect } from "react"

import dafaultAvatar from "../../Media/avatardef.svg"
import editIcon from "./Svg/edit.svg";

import DashboardTestCard from "../DashboardTestCard/DashboardTestCard";
import Loader from "../Loader/Loader"

function Dashboard() {
    let [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")) || {})
    useEffect(()=>{
        let x;
        if (Object.keys(userInfo).length === 0) {
            x = setInterval(x=>{
                setUserInfo(JSON.parse(sessionStorage.getItem("userInfo")) || {})
            })
        }

        return()=>{
            clearInterval(x)
        }
    }, [userInfo])
    return (
        <div className="Dashboard">
            <Loader visibility={Object.keys(userInfo).length === 0}/>
            <aside className="Dashboard__user-info">
                <h2 className="Dashboard__headline">Account information</h2>
                <div className="Dashboard__personal-info">
                    <img className="Dashboard__avatar" height={125} src={(Object.keys(userInfo.photoFile || {}).length !== 0 || userInfo.photo) ? (userInfo.photoFile) ? `data:${userInfo.photoFile.contentType};base64,${userInfo.photoFile.data}` : userInfo.photo : dafaultAvatar} alt={`Avatar of ${userInfo.name}`} />
                    <h3 className="Dashboard__headline Dashboard__headline_3">{userInfo.name}</h3>
                    <p className="Dashboard__subheadline">{userInfo.email}</p>
                    <button className="Dashboard__edit-info-btn"><img className="Dashboard__edit-info-btn-icon" height={20} src={editIcon} alt="edit" /></button>
                </div>
            </aside>
            <section className="Dashboard__tests">
                <h2 className="Dashboard__headline">Your tests</h2>
                <div className="Dashboard__test-container">
                    <DashboardTestCard name="Test n 1" description="The best test I have ever done" questions="20" countOfStudents="50" success="75%"/>
                    <DashboardTestCard name="Test n 2" description="The second best test I have ever done" questions="200" countOfStudents="5000000" success="100%"/>
                </div>
            </section>
        </div>
    )
}

export default Dashboard