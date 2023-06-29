import "./Styles/Dashboard.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

import dafaultAvatar from "../../Media/avatardef.svg"
import editIcon from "./Svg/edit.svg";
import addIcon from "./Svg/add.svg"

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
                <div className="Dashboard__group">
                    <h2 className="Dashboard__headline">Your tests</h2>
                    <Link to="/create-test">
                        <button className="Dashboard__create-btn"><img src={addIcon} alt="create" />Create</button>
                    </Link>
                </div>
                <div className="Dashboard__test-container">
                    {
                        userInfo.tests && userInfo.tests.length > 0 ? 
                        userInfo.tests.map(test=>{
                                <DashboardTestCard name={test.name} description={test.description} questions={test.questions.length} countOfStudents="soon" success="soon"/>
                            })
                        : <p className="Dashboard__error">You haven't any tests yet</p>
                    }
                </div>
            </section>
        </div>
    )
}

export default Dashboard