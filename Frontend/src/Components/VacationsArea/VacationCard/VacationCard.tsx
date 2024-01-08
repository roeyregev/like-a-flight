import { publicDecrypt } from "crypto";
import VacationModel from "../../../Models/vacation-model";
import "./VacationCard.css";
import classNames from "classnames";
import vacationsService from "../../../Services/VacationsService";

type VacationProps = {
    key: number
    vacation: VacationModel
    userId: number
}

function VacationCard(props: VacationProps): JSX.Element {

    function likeToggle() {

        if (props.vacation.isFollowing === 0) {
            vacationsService.likeVacation(props.vacation.vacationId, props.userId);
            props.vacation.isFollowing = 1;
        }
        else {
            vacationsService.unLikeVacation(props.vacation.vacationId, props.userId);
            props.vacation.isFollowing = 0;
        }
        
        console.log("isFollowing: " + props.vacation.isFollowing);
    }


    return (
        <div className="VacationCard">
            <div className="card-top-div">
                {/* <div className="likes-number">likes number</div> */}
                <div className="likes-number">{props.vacation.likes} likes</div>
                <img src={props.vacation.imageUrl} />
                <div className={classNames("like-btn", { "like-on": props.vacation.isFollowing === 1, "like-off": props.vacation.isFollowing === 0 })} onClick={likeToggle}>LIKE</div>
            </div>
            <h2>{props.vacation.destination}</h2>
            <p>Start Date - End Date</p>
            <p>{props.vacation.description}</p>
        </div >
    );
}

export default VacationCard;
