import ReactDOM from "react-dom";
import "./ConfirmationPopup.css";

type DeleteProps = {
    openConfirmation: Function
    handleConfirmDelete: Function
    handleCancelDelete: Function
}

function ConfirmationPopup(props: DeleteProps): JSX.Element {
    return ReactDOM.createPortal(
        <>
            <div className="background"></div>
            <div className="ConfirmationPopup">
                <p>Are you sure?</p>
                <button onClick={() => props.handleConfirmDelete()} className="confirm-btn">Yes</button>
                <button onClick={() => props.handleCancelDelete()} className="close-btn">Cancel</button>
            </div>
        </>,
        document.getElementById("portal")
    );
}

export default ConfirmationPopup;