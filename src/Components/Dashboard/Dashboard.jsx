import "./Styles/Dashboard.css"
import DashboardError from "./DashboardError"

function Dashboard ({logined, setLogined}){
    return (
        <section className="Dashboard">
            {
                !logined ? <DashboardError/>
                : "The page are currently in development"
            }
        </section>
    )
}

export default Dashboard