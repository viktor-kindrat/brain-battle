import "./Styles/Dashboard.css"
import { Link } from "react-router-dom";

import dafaultAvatar from "../../Media/avatardef.svg"
import editIcon from "./Svg/edit.svg";
import addIcon from "./Svg/add.svg"

import DashboardTestCard from "../DashboardTestCard/DashboardTestCard";
import Loader from "../Loader/Loader"

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

function Dashboard({ logined, setLogined, userData, setInvokeStatus }) {
    let navigate = useNavigate()
    useEffect(()=>{
        let tl = gsap.timeline();
        tl.fromTo(".Dashboard__user-info", {
            scale: 0
        }, {
            scale: 1,
            delay: 3,
            duration: 0.7,
            ease: "elastic.out"
        })
    }, [userData])
    let handleSettings = ()=>{
        let tl = gsap.timeline();
        tl.fromTo(".Dashboard__user-info, .Dashboard__tests", {
            scale: 1
        }, {
            scale: 0,
            duration: 0.8,
            ease: "elastic.out",
            stagger: 0.1
        })
        .then(()=>{
            navigate("/settings")
        })
    }
    return (
        <div className="Dashboard">
            <Loader visibility={Object.keys(userData).length === 0} />
            <aside className="Dashboard__user-info">
                <h2 className="Dashboard__headline">Account information</h2>
                <div className="Dashboard__personal-info">
                    <img className="Dashboard__avatar" height={125} src={(userData.photoFile?.contentType || userData.photo) ? (userData.photoFile?.contentType) ? `data:${userData.photoFile.contentType};base64,${userData.photoFile.data}` : userData.photo : dafaultAvatar} alt={`Avatar of ${userData.name}`} />
                    <h3 className="Dashboard__headline Dashboard__headline_3">{userData.name}</h3>
                    <p className="Dashboard__subheadline">{userData.email}</p>
                    <button onClick={handleSettings} className="Dashboard__edit-info-btn"><img className="Dashboard__edit-info-btn-icon" height={20} src={editIcon} alt="edit" /></button>
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
                        userData.tests && userData.tests.length > 0 ?
                            userData.tests.map((test, index) => {
                                let success = Math.round(test.testings.map(item => item.respondents.map(resp => Math.round((resp.answers.reduce((acc, value) => value === "true" ? acc += 1 : acc, 0) / resp.answers.length) * 100)).reduce((acc, value) => acc += value, 0) / item.respondents.length).reduce((acc, value) => acc += value, 0) / test.testings.length);
                                let countOfResps = test.testings.reduce((acc, value) => acc += value.respondents.length, 0);
                                return <DashboardTestCard key={index} userData={userData} test={test} id={test.id} name={test.name} description={test.description} questions={test.questions.length} countOfStudents={countOfResps === 0 ? "soon" : countOfResps} success={test.testings.length > 0 ? success + "%" : "soon"} />
                            }
                            )
                            : <p className="Dashboard__error">You haven't any tests yet</p>
                    }
                </div>
            </section>
        </div>
    )
}

export default Dashboard