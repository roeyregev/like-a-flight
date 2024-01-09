import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/vacation-model";
import "./AdminVacationCard.css";
import appConfig from "../../../Utils/AppConfig";

type VacationProps = {
    key: number
    vacation: VacationModel
}

function AdminVacationCard(props: VacationProps): JSX.Element {

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

    return (
        <div className="AdminVacationCard">

            <div className="card-top-div">
                <div className="likes-number">Likes number</div>
                <img src={props.vacation.imageUrl} />
                <div className="admin-btns">
                    <NavLink className="edit-btn" to={appConfig.editVacationRoute + props.vacation.vacationId}>Edit</NavLink>
                    <div className="delete-btn">Delete</div>
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
