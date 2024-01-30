import { useLocation, useNavigate } from "react-router-dom";
import "./Home.css";
import NotLoggedInPopup from "../../AuthArea/NotLoggedInPopup/NotLoggedInPopup";
import { useState } from "react";

function Home(): JSX.Element {
    const navigate = useNavigate()
    const location = useLocation();
    const state = location.state;

    const [showPopup, setShowPopup] = useState<boolean>(state?.showPopup);

    function handleClick() {
        navigate("/vacations")
    }

    function closePopup() {
        setShowPopup(false);
        console.log("close popup")
    }
            {showPopup && (<NotLoggedInPopup closePopup={closePopup} />)}
console.log("showPopup" + showPopup, location)
    return (
        <div className="Home">
            {showPopup && (<NotLoggedInPopup closePopup={closePopup} />)}

            <div>
                <h2>For those who like to like</h2>
                <p>Basically, we offer a very limited wishlist options.
                    It’s for vacations. yes that’s it. Our vacations list is also not so great. </p>
                <button onClick={handleClick}>Let’s like some flights!</button>
            </div>

            <div className="home-illustration">

            </div>
        </div>
    );
}

export default Home;
