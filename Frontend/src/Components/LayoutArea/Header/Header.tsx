import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import placeholderImage from "../../../Assets/Images/user-image.png";
import UserModel from "../../../Models/user-model";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import appConfig from "../../../Utils/AppConfig";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import UserPopup from "../../AuthArea/UserPopup/UserPopup";
import "./Header.css";

import adminLogo from "../../../Assets/Images/admin-logo.png"
import logo from "../../../Assets/Images/logo.png"


function Header(): JSX.Element {

    const navigate = useNavigate()
    const [user, setUser] = useState<UserModel>()
    const [registerOpen, setRegisterOpen] = useState<boolean>(false)
    const [loginOpen, setLoginOpen] = useState<boolean>(false)
    const [userPopupOpen, setUserPopupOpen] = useState<boolean>(false)

    useEffect(() => {
        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
            console.log(user);
        });

        return unsubscribe;
    }, [])

    function logout() {
        authService.logout();
        notificationService.success("You are now Logged out");
        navigate("/home");
    }

    function deleteUser(userId: number) {
        authService.deleteAccount(userId)
        console.log("userId: " + userId)
    }

    if (user && user.roleId === 1) {
        return (
            <div className="Header Master-Header">
                <NavLink to={appConfig.homeRoute} className="logo">
                    {/* <h2>Logo</h2> */}
                    <img src={adminLogo} alt="admin-logo" />
                </NavLink>
                <a className="hello-master" href="#" >Hello Master</a>
                {user.userImageUrl ? (
                    <img onClick={() => setUserPopupOpen(true)} src={user.userImageUrl} className="user-image" />) : (<img src={placeholderImage} className="user-image" />)
                }

                <UserPopup open={userPopupOpen} setOpen={setUserPopupOpen} user={user} logout={logout} deleteUser={deleteUser} />
            </div>
        )
    };

    if (user && user.roleId === 2) {
        return (
            <div className="Header">
                <NavLink to={appConfig.homeRoute} className="logo">
                <img src={logo} alt="logo" />
                </NavLink>

                <div className="authLinks">
                    <a href="#" onClick={logout}>Logout</a>
                    <span>|</span>
                    <a href="#" >Hello {user.firstName}</a>
                    {user.userImageUrl ? (
                        <img onClick={() => setUserPopupOpen(true)} src={user.userImageUrl} className="user-image" />) : (<img src={placeholderImage} className="user-image" />)
                    }
                </div>
                <UserPopup open={userPopupOpen} setOpen={setUserPopupOpen} user={user} logout={logout} deleteUser={deleteUser} />
            </div>
        )
    };

    return (
        <div className="Header">

            <Register open={registerOpen} onClose={() => setRegisterOpen(false)} switchToLogin={() => { setRegisterOpen(false); setLoginOpen(true) }} />
            <Login open={loginOpen} onClose={() => setLoginOpen(false)} switchToRegister={() => { setRegisterOpen(true); setLoginOpen(false) }} />

            <NavLink to={appConfig.homeRoute} className="logo">
                <h2>Logo</h2>
            </NavLink>

            <div className="authLinks">
                <a href="#" onClick={() => setLoginOpen(true)}>Login</a>
                <span>|</span>
                <a href="#" onClick={() => setRegisterOpen(true)}>Register</a>
            </div>

        </div>
    )
}

export default Header