import { publicDecrypt } from "crypto";
import VacationModel from "../../../Models/vacation-model";
import "./VacationCard.css";

type VacationProps = {
    key: number
    vacation: VacationModel
}

function VacationCard(props: VacationProps): JSX.Element {

    function likeToggle() {
        console.log("isFollowing: " + props.vacation.isFollowing);
    }


    return (
        <div className="VacationCard">
            <div className="card-top-div">
                {/* <div className="likes-number">likes number</div> */}
                <div className="likes-number">{props.vacation.likes} likes</div>
                <img src={props.vacation.imageUrl} />
                <div className= "like-btn" onClick={likeToggle}>LIKE</div>
            </div>
            <h2>{props.vacation.destination}</h2>
            <p>Start Date - End Date</p>
            <p>{props.vacation.description}</p>
        </div>
    );
}

export default VacationCard;
