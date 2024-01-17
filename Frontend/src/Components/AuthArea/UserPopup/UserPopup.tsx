import ReactDOM from "react-dom";
import "./UserPopup.css";
import UserModel from "../../../Models/user-model";

type UserPopupProps = {
    open: boolean
    setOpen: Function
    user: UserModel
    logout: Function
    // onClose: any
}

function UserPopup(props: UserPopupProps): JSX.Element {

    if (!props.open) return null

    return ReactDOM.createPortal(
        <>
            <div className="background" onClick={() => props.setOpen(false)}></div>
            <div className="UserPopup">
                <div className=" triangle"></div>

                <div className="user-popup-main">
                    <button className="close-btn" onClick={() => props.setOpen(false)}>X</button>
                    <div className="full-name">
                        <p>{props.user.firstName}</p>
                        <p>{props.user.lastName}</p>
                    </div>
                    <div className="likes-count">
                        <div>❤️</div>
                        <div>xxx liked flights</div>
                    </div>
                    <button onClick={()=> props.logout()}>Logout</button>
                    <button>Delete Account</button>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
}

export default UserPopup;
