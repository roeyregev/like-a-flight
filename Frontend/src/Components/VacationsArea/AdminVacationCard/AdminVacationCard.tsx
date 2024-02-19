import { useState } from "react";
import { NavLink } from "react-router-dom";
import deleteBtn from "../../../Assets/Images/Delete-btn.png";
import editBtn from "../../../Assets/Images/Edit-btn.png";
import greenHeart from "../../../Assets/Images/green-heart.svg";
import UserModel from "../../../Models/user-model";
import VacationModel from "../../../Models/vacation-model";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import appConfig from "../../../Utils/AppConfig";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import "./AdminVacationCard.css";

type VacationProps = {
    key: number
    vacation: VacationModel
    vacations: VacationModel[]
    setVacations: Function
    user: UserModel
}

function AdminVacationCard(props: VacationProps): JSX.Element {

    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

    function formatRawDate(rawDate: string): string {
        const dateObject = new Date(rawDate);
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'Asia/Jerusalem'
        };
        return dateObject.toLocaleString('en-GB', options);
    }

    // ------------------- Delete flow ------------------- 
    function openConfirmation() {
        setShowConfirmationPopup(true);
    }

    async function handleConfirmDelete() {
        await vacationsService.deleteVacation(props.vacation.vacationId);
        const updatedVacations = await vacationsService.getAllVacations(props.user.userId)
        props.setVacations(updatedVacations);
        setShowConfirmationPopup(false);
        notificationService.success("Flight deleted successfully")
    }

    function handleCancelDelete() {
        setShowConfirmationPopup(false);
    }
    // ------------------- End of delete flow ------------------- 

    return (
        <div className="AdminVacationCard">

            {showConfirmationPopup && (
                <ConfirmationPopup openConfirmation={openConfirmation} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} />
            )}

            <div className="card-top-div">
                <div className="likes-number">
                    <img src={greenHeart} alt="green-heart" />
                    {props.vacation.likes}
                </div>
                <div className="price">$ {props.vacation.price}</div>
                <img src={props.vacation.imageUrl} className="destination-pic" />
                <div className="admin-btns">
                    <NavLink className="edit-btn" to={appConfig.editVacationRoute + props.vacation.vacationId}>
                        <img src={editBtn} alt="edit-btn" />
                    </NavLink>
                    <div className="delete-btn" onClick={openConfirmation}>
                        <img src={deleteBtn} alt="delete-btn" />
                    </div>
                </div>
            </div>
            <div className="card-bottom-div">
                <h2>{props.vacation.destination}</h2>
                <div className="date-div">


                    <span>{formatRawDate(new Date(props.vacation.startDate).toISOString())}</span>
                    <span> - </span>
                    <span>{formatRawDate(new Date(props.vacation.endDate).toISOString())}</span>
                </div>
                <p>{props.vacation.description}</p>
            </div>
        </div>
    );
}

export default AdminVacationCard;