import "./Styles/StreamTest.css"

function StreamTest(){
    return (
        <section className="StreamTest">
            TESTING {window.location.hash.substring(1)}
        </section>
    )
}

export default StreamTest