import { useNavigate } from "react-router-dom";
import "./NoVacations.css";

function NoVacations(): JSX.Element {

    const navigate = useNavigate()

    return (
        <div className="NoVacations">
            <div className="typo">
                <h1>SORRY!</h1>
                <h2>No flights today :(</h2>
            </div>
            <button onClick={() => navigate("/home")}>Back to homepage</button>

        </div>
    );
}

export default NoVacations;
