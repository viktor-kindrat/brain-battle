import "./Styles/DashboardTestCard.css";

import { useNavigate } from "react-router-dom";

function DashboardTestCard({ name, id, description, questions, countOfStudents, success }) {
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