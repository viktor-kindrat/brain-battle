import "./Styles/DashboardTestCard.css";

function DashboardTestCard({name, description, questions, countOfStudents, success}) {
    return (
        <article className="DashboardTestCard">
            <h3 className="DashboardTestCard__headline DashboardTestCard__headline_3">{name}</h3>
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