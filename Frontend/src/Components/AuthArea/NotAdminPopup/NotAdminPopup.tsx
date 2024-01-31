import ReactDOM from "react-dom";
import mediumCloseIcon from "../../../Assets/Images/close-icon-medium.svg";
import "./NotAdminPopup.css";


type popupProps = {
    closePopup: Function
}

function NotAdminPopup(props: popupProps): JSX.Element {

    return ReactDOM.createPortal(
        <>
            <div className="background"></div>
            <div className="NotAdminPopup">
                <img src={mediumCloseIcon} alt="close-icon" className="close-btn" onClick={() => props.closePopup()} />
                <h2>Only administrators can see this</h2>
                <div className="btns-flex">
                    <button onClick={() => props.closePopup()}>Got it</button>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
}

export default NotAdminPopup;
