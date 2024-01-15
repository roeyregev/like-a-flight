import { NavLink } from "react-router-dom";
import "./NotLoggedInPopup.css";
import appConfig from "../../../Utils/AppConfig";
import ReactDOM from "react-dom";

function NotLoggedInPopup(): JSX.Element {
    return ReactDOM.createPortal(
        <>
            <div className="background"></div>
            <div className="NotLoggedInPopup">
                <p>You have be logged-in</p>
                <div className="btns-flex">
                    <button>Login</button>
                    <button>Register</button>
                    <NavLink to={appConfig.homeRoute}>Back to Homepage</NavLink>
                </div>
            </div>
        </>,
         document.getElementById("portal")
    );
}

export default NotLoggedInPopup;
