import { useNavigate } from "react-router-dom";
import notFoundIllustration from "../../../Assets/Images/404-illustration.png";
import "./PageNotFound.css";


function PageNotFound(): JSX.Element {

    const navigate = useNavigate()

    return (
        <div className="PageNotFound">
            <div className="typo">
                <h1>404</h1>
                <h2>Page not found</h2>
            </div>
            <button onClick={() => navigate("/home")}>Back to homepage</button>
            <img src={notFoundIllustration} alt="not-found-illustration" />
        </div>
    );
}

export default PageNotFound;
