export default function Success(){
    return(
        <div className="success-flex">
        <p className="success">Thank you for your contribution!</p>
        <a className="go-home-success" href="/">
        <p className="success-home">Go Home</p>
        <img src="./images/arrow.webp" alt="home arrow" className="success-img"/>
        </a>
        </div>
    )
}