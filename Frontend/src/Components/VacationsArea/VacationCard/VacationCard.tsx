import classNames from "classnames";
import VacationModel from "../../../Models/vacation-model";
import "./VacationCard.css";

import greenHeart from "../../../Assets/Images/green-heart.svg"
import likeOff from "../../../Assets/Images/like-btn-off.png"
import likeOn from "../../../Assets/Images/like-btn-on.png"

type VacationProps = {
    key: number
    vacation: VacationModel
    userId: number
    vacations: VacationModel[]
    setVacations: Function
    likeToggle: Function
}

function VacationCard(props: VacationProps): JSX.Element {

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
                <div className="likes-number">
                    <img src={greenHeart} alt="green-heart" />
                    {props.vacation.likes}</div>
                <div className="price">$ {props.vacation.price}</div>
                <img src={props.vacation.imageUrl} className="destination-pic"/>
                <div className={classNames("like-btn", { "like-on": props.vacation.isFollowing === 1, "like-off": props.vacation.isFollowing === 0 })} onClick={() => props.likeToggle(props.vacation.vacationId)}>
                    {props.vacation.isFollowing ? <img src={likeOn} /> : <img src={likeOff} />}
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
        </div >
    );
}

export default VacationCard;
