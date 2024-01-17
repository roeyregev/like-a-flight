import { useState } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/vacation-model";
import vacationsService from "../../../Services/VacationsService";
import appConfig from "../../../Utils/AppConfig";
import "./AdminVacationCard.css";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import UserModel from "../../../Models/user-model";
import notificationService from "../../../Services/NotificationService";

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
            timeZone: 'UTC'
        };
        return dateObject.toLocaleString('en-GB', options);
    }



    // Delete flow:

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

    //------------------------------------------------------------------------------------------------


    return (
        <div className="AdminVacationCard">

            {showConfirmationPopup && (
                <ConfirmationPopup openConfirmation={openConfirmation} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete} />
            )}

            <div className="card-top-div">
                <div className="likes-number">Likes number</div>
                <img src={props.vacation.imageUrl} />
                <div className="admin-btns">
                    <NavLink className="edit-btn" to={appConfig.editVacationRoute + props.vacation.vacationId}>Edit</NavLink>
                    <div className="delete-btn" onClick={openConfirmation}>Delete</div>
                </div>
            </div>
            <h2>{props.vacation.destination}</h2>
            <div className="date-div">
                <span>{formatRawDate(new Date(props.vacation.startDate).toISOString())}</span>

                <span> - </span>
                <span>{formatRawDate(new Date(props.vacation.endDate).toISOString())}</span>
            </div>
            <p>{props.vacation.description}</p>

        </div>
    );
}

export default AdminVacationCard;
