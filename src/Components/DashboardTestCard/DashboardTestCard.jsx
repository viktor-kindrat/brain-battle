import "./Styles/DashboardTestCard.css";

import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { gsap } from "gsap";

function DashboardTestCard({ userData, name, id, description, questions, countOfStudents, success }) {
    useEffect(()=>{
        let tl = gsap.timeline();
        tl.fromTo(".DashboardTestCard", {
            x: -50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: -0.1,
            delay: 3.1,
            ease: "elastic.out"
        })
    }, [userData.tests])
    let navigate = useNavigate()
    const playHandler = () => {
        navigate(`/stream/#${id}`)
    }
    return (
        <article className="DashboardTestCard" data-id={id}>
            <div className="DashboardTestCard__row">
                <h3 className="DashboardTestCard__headline">{name}</h3>
                <button onClick={playHandler} className="DashboardTestCard__btn">Play</button>
            </div>
            <p className="DashboardTestCard__description">
                {description}
            </p>
            <div className="DashboardTestCard__info">
                <div className="DashboardTestCard__info-item">
                    <span className="DashboardTestCard__info-item-value">{questions}</span>
                    <span className="DashboardTestCard__info-item-caption">Questions</span>
                </div>
                <div className="DashboardTestCard__info-item">
                    <span className="DashboardTestCard__info-item-value">{countOfStudents}</span>
                    <span className="DashboardTestCard__info-item-caption">Students passed</span>
                </div>
                <div className="DashboardTestCard__info-item">
                    <span className="DashboardTestCard__info-item-value">{success}</span>
                    <span className="DashboardTestCard__info-item-caption">Success</span>
                </div>
            </div>
        </article>
    )
}

export default DashboardTestCard