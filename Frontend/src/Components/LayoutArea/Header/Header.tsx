import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import appConfig from "../../../Utils/AppConfig";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import "./Header.css";
import UserModel from "../../../Models/user-model";
import { authStore } from "../../../Redux/AuthState";
import notificationService from "../../../Services/NotificationService";

function Header(): JSX.Element {

    const navigate = useNavigate()
    const [user, setUser] = useState<UserModel>()
    const [registerOpen, setRegisterOpen] = useState<boolean>(false)
    const [loginOpen, setLoginOpen] = useState<boolean>(false)

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

    if (user) {
        return (
            <div className="Header">
                <NavLink to={appConfig.homeRoute} className="logo">
                    <h2>Logo</h2>
                </NavLink>

                <div className="authLinks">
                    <a href="#" onClick={logout}>Logout</a>
                    <span>|</span>
                    <a href="#" >Hello {user.firstName}</a>
                    <img src="" className="user-image"/>
                </div>
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