import "./Styles/Dashboard.css"
import DashboardError from "./DashboardError"
import Dasboard from "../Dashboard/Dashboard"

function DashboardRoot ({logined, setLogined, userData, setInvokeStatus}){
    return (
        <section className="DashboardRoot">
            {
                !logined ? <DashboardError/>
                : <Dasboard {...{logined, setLogined, userData, setInvokeStatus}} />
            }
        </section>
    )
}

export default DashboardRoot