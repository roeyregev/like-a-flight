import ReactDOM from "react-dom";
import mediumCloseIcon from "../../../Assets/Images/close-icon-medium.svg";
import "./NotLoggedInPopup.css";


function NotLoggedInPopup(): JSX.Element {

    return ReactDOM.createPortal(
        <>
            <div className="background"></div>
            <div className="NotLoggedInPopup">
                <img src={mediumCloseIcon} alt="close-icon" className="close-btn" />
                <h2>You have be logged-in</h2>
                <div className="btns-flex">
                    <button>Login</button>
                    <button>Register</button>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
}

export default NotLoggedInPopup;
