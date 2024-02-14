import classNames from "classnames";
import { useEffect, useState } from "react";
import Lottie from 'react-lottie';
import likeOffAnimation from "../../../Assets/Animations/like-off.json";
import likeOnAnimation from "../../../Assets/Animations/like-on.json";
import greenHeart from "../../../Assets/Images/green-heart.svg";
import VacationModel from "../../../Models/vacation-model";
import "./VacationCard.css";

type VacationProps = {
    key: number
    vacation: VacationModel
    userId: number
    vacations: VacationModel[]
    setVacations: Function
    likeToggle: Function
}

function VacationCard(props: VacationProps): JSX.Element {

    const [isFollowing, setIsFollowing] = useState<boolean>(props.vacation.isFollowing === 1);

    // set initial animation state
    const currentAnimationData = isFollowing ? likeOnAnimation : likeOffAnimation;

    // Initialize likeAnimationOptions
    const [likeAnimationOptions, setLikeAnimationOptions] = useState({
        loop: false,
        autoplay: false,
        animationData: currentAnimationData, // Default to likeAnimationOn
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    });

    useEffect(() => {
        // Set initial on mount animation options 
        setLikeAnimationOptions({
            loop: false,
            autoplay: false,
            animationData: currentAnimationData,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
            },
        });
    }, [isFollowing, currentAnimationData]);

    const handleClick = () => {
        setIsFollowing(!isFollowing);
        props.likeToggle(props.vacation.vacationId);
    }

    // original:
    function formatRawDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'UTC'
        };
        return date.toLocaleDateString('en-GB', options);
    }


    return (
        <div className="VacationCard">
            <div className="card-top-div">
                <div className="likes-number">
                    <img src={greenHeart} alt="green-heart" />
                    {props.vacation.likes}</div>
                <div className="price">$ {props.vacation.price}</div>
                <img src={props.vacation.imageUrl} className="destination-pic" />
                <div className={classNames("like-btn", { "like-on": props.vacation.isFollowing === 1, "like-off": props.vacation.isFollowing === 0 })} onClick={handleClick}>
                    <Lottie options={likeAnimationOptions} />
                </div>
            </div>
            <div className="card-bottom-div">
                <h2>{props.vacation.destination}</h2>
                <div className="date-div">
                    <span>{formatRawDate(new Date(props.vacation.startDate))}</span>
                    <span> - </span>
                    <span>{formatRawDate(new Date(props.vacation.endDate))}</span>
                </div>
                <p>{props.vacation.description}</p>
            </div>
        </div >
    );
}

export default VacationCard;