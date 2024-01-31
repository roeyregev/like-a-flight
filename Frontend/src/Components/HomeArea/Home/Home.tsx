import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import appConfig from "../../../Utils/AppConfig";
import NotLoggedInPopup from "../../AuthArea/NotLoggedInPopup/NotLoggedInPopup";
import "./Home.css";
import NotAdminPopup from "../../AuthArea/NotAdminPopup/NotAdminPopup";

function Home(): JSX.Element {
    const navigate = useNavigate()
    const location = useLocation();
    const state = location.state;
    // const adminState = location.state;
    

    const [showPopup, setShowPopup] = useState<boolean>(state?.showPopup);
    const [showAdminPopup, setShowAdminPopup] = useState<boolean>(state?.showAdminPopup);

    // function handleClick() {
    //     navigate("/vacations")
    // }

    function closePopup() {
        setShowPopup(false);
        console.log("close popup")
    }
    function closeAdminPopup() {
        setShowAdminPopup(false);
        console.log("close Admin popup")
    }

    // { showPopup && (<NotLoggedInPopup closePopup={closePopup} />) }
    // console.log("showPopup" + showPopup + " " + location)

    // { showAdminPopup && (<NotAdminPopup closePopup={closePopup} />) }
    // console.log("showAdminPopup" + showPopup + " " + location)

    return (
        <div className="Home">
            {showPopup && (<NotLoggedInPopup closePopup={closePopup} />)}
            {showAdminPopup && (<NotAdminPopup closePopup={closeAdminPopup} />)}

            <div className="home-flex">
                <h2>For those who like to like</h2>
                <p>Basically, we offer a very limited wishlist options.
                    It’s for vacations. yes that’s it. Our vacations list is also not so great. </p>
                {/* <button onClick={handleClick}>Let’s like some flights!</button> */}
                <NavLink to={appConfig.vacationsRoute}>Let’s like some flights!</NavLink>
            </div>

            <div className="home-illustration">

            </div>
        </div>
    );
}

export default Home;
