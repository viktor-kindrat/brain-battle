import "./Styles/Home.css"

function Home (){
    return (
        <section className="Home">
            <div className="Home__content-container">
                <h1 className="Home__headline">Brain Battle -<br /> The best kahoot platform</h1>
                <div className="Home__button-container">
                    <button className="Home__button Home__button_filled">Join test</button>
                    <button className="Home__button Home__button_transparent">Create your test</button>
                </div>
            </div>
        </section>
    )
}

export default Home