import "./Styles/Dashboard.css"
import { Link } from "react-router-dom";

import dafaultAvatar from "../../Media/avatardef.svg"
import editIcon from "./Svg/edit.svg";
import addIcon from "./Svg/add.svg"

import DashboardTestCard from "../DashboardTestCard/DashboardTestCard";
import Loader from "../Loader/Loader"

function Dashboard({logined, setLogined, userData, setInvokeStatus}) {
    return (
        <div className="Dashboard">
            <Loader visibility={Object.keys(userData).length === 0}/>
            <aside className="Dashboard__user-info">
                <h2 className="Dashboard__headline">Account information</h2>
                <div className="Dashboard__personal-info">
                    <img className="Dashboard__avatar" height={125} src={(Object.keys(userData.photoFile || {}).length !== 0 || userData.photo) ? (userData.photoFile) ? `data:${userData.photoFile.contentType};base64,${userData.photoFile.data}` : userData.photo : dafaultAvatar} alt={`Avatar of ${userData.name}`} />
                    <h3 className="Dashboard__headline Dashboard__headline_3">{userData.name}</h3>
                    <p className="Dashboard__subheadline">{userData.email}</p>
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
                        userData.tests && userData.tests.length > 0 ? 
                        userData.tests.map((test, index)=>
                                <DashboardTestCard key={index} id={test.id} name={test.name} description={test.description} questions={test.questions.length} countOfStudents="soon" success="soon"/>
                            )
                        : <p className="Dashboard__error">You haven't any tests yet</p>
                    }
                </div>
            </section>
        </div>
    )
}

export default Dashboard