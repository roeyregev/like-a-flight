import "./UserPopup.css";

function UserPopup(): JSX.Element {
    return (
        <div className="UserPopup">
            <div className=" triangle"></div>

            <div className="user-popup-main">
                <div className="full-name">
                    <p>First name</p>
                    <p>Last name</p>
                </div>
                <div className="likes-count">
                    <div>❤️</div>
                    <div>12 liked flights</div>
                </div>
                <button>Logout</button>
                <button>Delete Account</button>
            </div>
        </div>
    );
}

export default UserPopup;
