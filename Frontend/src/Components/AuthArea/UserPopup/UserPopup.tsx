import ReactDOM from "react-dom";
import "./UserPopup.css";
import UserModel from "../../../Models/user-model";
import { useState } from "react";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import ConfirmationPopup from "../../VacationsArea/ConfirmationPopup/ConfirmationPopup";
import { useNavigate } from "react-router-dom";
import appConfig from "../../../Utils/AppConfig";
import closeIcon from "../../../Assets/Images/close-icon-small.svg"

type UserPopupProps = {
    open: boolean
    setOpen: Function
    user: UserModel
    logout: Function
    deleteUser: Function
}

function UserPopup(props: UserPopupProps): JSX.Element {
    const navigate = useNavigate()
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

    // Delete flow:

    function openConfirmation() {
        setShowConfirmationPopup(true);
    }

    async function handleConfirmDelete() {
        await props.deleteUser(props.user.userId);
        props.logout();
        setShowConfirmationPopup(false);
        props.setOpen(false);
        navigate(appConfig.homeRoute)
        notificationService.success("Your account was deleted successfully")
    }

    function handleCancelDelete() {
        setShowConfirmationPopup(false);
    }

    //------------------------------------------------------------------------------------------------

    if (!props.open) return null

    return ReactDOM.createPortal(
        <>
            {showConfirmationPopup && (
                <ConfirmationPopup openConfirmation={openConfirmation} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} />
            )}

            <div className="background" onClick={() => props.setOpen(false)}></div>
            <div className="UserPopup">
                <div className=" triangle"></div>

                <div className="user-popup-main">
                    <button className="close-btn" onClick={() => props.setOpen(false)}>
                        <img src={closeIcon} alt="close-icon" />
                    </button>
                    <div className="full-name">
                        <p>{props.user.firstName}</p>
                        <p>{props.user.lastName}</p>
                    </div>
                    <button onClick={() => props.logout()}>Logout</button>
                    <button onClick={() => openConfirmation()} className="delete-btn">Delete Account</button>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    );
}

export default UserPopup;
