import { useState } from "react";
import Lottie from "react-lottie";
import { NavLink, useLocation } from "react-router-dom";
import homeAnimation from "../../../Assets/Animations/plane-aniamtion.json";
import appConfig from "../../../Utils/AppConfig";
import NotAdminPopup from "../../AuthArea/NotAdminPopup/NotAdminPopup";
import NotLoggedInPopup from "../../AuthArea/NotLoggedInPopup/NotLoggedInPopup";
import "./Home.css";

function Home(): JSX.Element {
    const location = useLocation();
    const state = location.state;
    const [showPopup, setShowPopup] = useState<boolean>(state?.showPopup);
    const [showAdminPopup, setShowAdminPopup] = useState<boolean>(state?.showAdminPopup);

    function closePopup() {
        setShowPopup(false);
        console.log("close popup")
    }

    function closeAdminPopup() {
        setShowAdminPopup(false);
        console.log("close Admin popup")
    }

    const homeAnimationData = {
        animationData: homeAnimation,
        loop: true,
        autoplay: true,
    }

    return (
        <div className="Home">
            {showPopup && (<NotLoggedInPopup closePopup={closePopup} />)}
            {showAdminPopup && (<NotAdminPopup closePopup={closeAdminPopup} />)}

            <div className="home-flex">
                <h2>For those who like to like</h2>
                <p>Basically, we offer a very limited wishlist options.
                    It’s for vacations. yes that’s it. Our vacations list is also not so great. </p>
                <NavLink className="main-btn" to={appConfig.vacationsRoute}>Let’s like some flights!</NavLink>
            </div>

            <div className="home-illustration">
                <Lottie options={homeAnimationData} />
            </div>
        </div>
    );
}

export default Home;
