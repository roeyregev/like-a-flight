import { publicDecrypt } from "crypto";
import VacationModel from "../../../Models/vacation-model";
import "./VacationCard.css";
import classNames from "classnames";
import vacationsService from "../../../Services/VacationsService";
import moment from "moment";

type VacationProps = {
    key: number
    vacation: VacationModel
    userId: number
}

function VacationCard(props: VacationProps): JSX.Element {

    // const startDate = moment(props.vacation.startDate);
    // console.log(startDate);

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

    function formatRawDate(rawDate: string): string {
        const dateObject = new Date(rawDate);

        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            // hour: '2-digit',
            // minute: '2-digit',
            // second: '2-digit',
            timeZone: 'UTC'
        };

        return dateObject.toLocaleString('en-GB', options);
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
            <div className="date-div">
                <span>{formatRawDate(new Date(props.vacation.startDate).toISOString())}</span>

                <span> - </span>
                <span>{formatRawDate(new Date(props.vacation.endDate).toISOString())}</span>
            </div>
            <p>{props.vacation.description}</p>
        </div >
    );
}

export default VacationCard;
