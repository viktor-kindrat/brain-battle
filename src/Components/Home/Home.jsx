import "./Styles/Home.css"

import { Link } from "react-router-dom"

import { gsap } from "gsap";

import { useEffect } from "react";

function Home ({logined}){
    useEffect(()=>{
        let tl = gsap.timeline();
        tl.set(".Home__content-container", {
            scale: 0,
            rotate: 5
        })
        tl.fromTo(".Home__content-container", {
            scale: 0,
            rotate: 30
        }, {
            scale: 1,
            rotate: 0,
            duration: 0.8,
            ease: "elastic.out"
        })
    })

    return (
        <section className="Home">
            <div className="Home__content-container">
                <h1 className="Home__headline">Brain Battle -<br /> The best testing platform</h1>
                <div className="Home__button-container">
                    <Link to="/join">
                        <button className="Home__button Home__button_filled">Join test</button>
                    </Link>
                    <Link to={logined ? `/dashboard` : `/logIn`}>
                        <button className="Home__button Home__button_transparent">Create your test</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Home