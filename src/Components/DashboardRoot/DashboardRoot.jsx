import "./Styles/Dashboard.css"
import DashboardError from "./DashboardError"
import Dasboard from "../Dashboard/Dashboard"

function DashboardRoot ({logined, setLogined}){
    return (
        <section className="DashboardRoot">
            {
                !logined ? <DashboardError/>
                : <Dasboard />
            }
        </section>
    )
}

export default DashboardRoot