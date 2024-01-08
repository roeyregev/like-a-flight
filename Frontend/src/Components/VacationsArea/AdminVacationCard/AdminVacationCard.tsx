import VacationModel from "../../../Models/vacation-model";
import "./AdminVacationCard.css";

type VacationProps = {
    key: number
    vacation: VacationModel
}

function AdminVacationCard(props: VacationProps): JSX.Element {
    return (
        <div className="AdminVacationCard">

            <div className="card-top-div">
                <div className="likes-number">Likes number</div>
                <img src={props.vacation.imageUrl} />
                <div className="admin-btns">
                    <div className="edit-btn">Edit</div>
                    <div className="delete-btn">Delete</div>
                </div>
            </div>
            <h2>{props.vacation.destination}</h2>
            <p>Start Date - End Date</p>
            <p>{props.vacation.description}</p>

        </div>
    );
}

export default AdminVacationCard;
