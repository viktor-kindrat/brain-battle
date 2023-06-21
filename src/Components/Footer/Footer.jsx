import "./Styles/Footer.css"

function Footer (){
    return (
        <footer className="Footer">
            <div className="Footer__copy">Brain Battle &copy;Copyright {new Date().getFullYear()}</div>
        </footer>
    )
}

export default Footer