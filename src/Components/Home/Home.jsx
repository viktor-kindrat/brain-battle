import "./Styles/Home.css"

import { Link } from "react-router-dom"

function Home ({logined}){
    return (
        <section className="Home">
            <div className="Home__content-container">
                <h1 className="Home__headline">Brain Battle -<br /> The best testing platform</h1>
                <div className="Home__button-container">
                    <button className="Home__button Home__button_filled">Join test</button>
                    <Link to={logined ? `/dashboard` : `/logIn`}>
                        <button className="Home__button Home__button_transparent">Create your test</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Home