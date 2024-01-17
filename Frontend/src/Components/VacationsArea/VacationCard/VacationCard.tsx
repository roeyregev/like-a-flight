import classNames from "classnames";
import { useState } from "react";
import VacationModel from "../../../Models/vacation-model";
import vacationsService from "../../../Services/VacationsService";
import "./VacationCard.css";
import axios from "axios";
import appConfig from "../../../Utils/AppConfig";

type VacationProps = {
    key: number
    vacation: VacationModel
    userId: number
    vacations: VacationModel[]
    setVacations: Function
    likeToggle: Function
}

function VacationCard(props: VacationProps): JSX.Element {
    // const [likesNumber, setLikesNumber] = useState<number>(props.vacation.likes)
    // const [isFollowing, setIsFollowing] = useState<number>(props.vacation.isFollowing);

    // async function likeToggle() {
    //     if (isFollowing === 0) {
    //         vacationsService.likeVacation(props.vacation.vacationId, props.userId);
    //         setIsFollowing(1);
    //     }
    //     if (isFollowing === 1) {
    //         vacationsService.unLikeVacation(props.vacation.vacationId, props.userId);
    //         setIsFollowing(0);
    //     }
    // }

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
        <div className="VacationCard">
            <div className="card-top-div">
                <div className="likes-number">{props.vacation.likes} likes</div>
                <img src={props.vacation.imageUrl} />
                <div className={classNames("like-btn", { "like-on": props.vacation.isFollowing === 1, "like-off": props.vacation.isFollowing === 0 })} onClick={()=>props.likeToggle(props.vacation.vacationId)}>LIKE</div>
                {/* <div className={classNames("like-btn", { "like-on": isFollowing === 1, "like-off": isFollowing === 0 })} onClick={likeToggle}>LIKE</div> */}
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
