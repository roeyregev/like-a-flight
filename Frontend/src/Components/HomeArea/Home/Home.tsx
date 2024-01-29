import { useNavigate } from "react-router-dom";
import "./Home.css";
import NotLoggedInPopup from "../../AuthArea/NotLoggedInPopup/NotLoggedInPopup";
import { useState } from "react";

function Home(): JSX.Element {

    const [notLoggedPopup, setNotLoggedPopup] = useState<boolean>(false)
    const navigate = useNavigate()

    function handleClick() {
        navigate("/vacations")
    }

    return (
        <div className="Home">
            {notLoggedPopup && <NotLoggedInPopup />}
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
