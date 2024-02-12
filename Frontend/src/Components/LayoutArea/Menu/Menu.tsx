import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import analyticsIcon from "../../../Assets/Images/analytics-menu.svg";
import smallArrow from "../../../Assets/Images/arrow-icon-small.svg";
import flightIcon from "../../../Assets/Images/flights-menu.svg";
import homeIcon from "../../../Assets/Images/home-menu.svg";
import UserModel from "../../../Models/user-model";
import { authStore } from "../../../Redux/AuthState";
import appConfig from "../../../Utils/AppConfig";
import "./Menu.css";

function Menu(): JSX.Element {
    const [user, setUser] = useState<UserModel>()
    const location = useLocation();

    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return unsubscribe;
    }, [])


    if (user && user.roleId === 1 && (location.pathname == "/home/" || location.pathname == "/home"))
        return (
            <div className="Menu right-flex">
                <NavLink to={appConfig.vacationsRoute}>
                    <div className="menu-icon">
                        <img src={flightIcon} alt="flights-icon" />
                        <img src={smallArrow} alt="small-arrow" className="right" />
                    </div>
                </NavLink>
                <NavLink to={appConfig.analyticsRoute}>
                    <div className="menu-icon">
                        <img src={analyticsIcon} alt="analytics-icon" />
                        <img src={smallArrow} alt="small-arrow" className="right" />
                    </div>
                </NavLink>
            </div>
        );

    if (user && user.roleId === 1 && (location.pathname == "/vacations/" || location.pathname == "/vacations"))
        return (
            <div className="Menu space-flex">
                <NavLink to={appConfig.homeRoute}>
                    <div className="menu-icon">
                        <img src={smallArrow} alt="small-arrow" />
                        <img src={homeIcon} alt="home-icon" />
                    </div>
                </NavLink>
                <NavLink to={appConfig.analyticsRoute}>
                    <div className="menu-icon">
                        <img src={analyticsIcon} alt="analytics-icon" />
                        <img src={smallArrow} alt="small-arrow" className="right" />
                    </div>
                </NavLink>
            </div>
        );

    if (user && user.roleId === 1 && location.pathname == "/vacations/analytics/")
        return (
            <div className="Menu left-flex">
                <NavLink to={appConfig.homeRoute}>
                    <div className="menu-icon">
                        <img src={smallArrow} alt="small-arrow" />
                        <img src={homeIcon} alt="home-icon" />
                    </div>
                </NavLink>
                <NavLink to={appConfig.vacationsRoute}>
                    <div className="menu-icon">
                        <img src={smallArrow} alt="small-arrow" />
                        <img src={flightIcon} alt="flights-icon" />
                    </div>
                </NavLink>
            </div>
        );

    if (user && user.roleId === 1 && (location.pathname == "/vacations/add/" || location.pathname == "/vacations/edit/"))
        return (
            <div className="Menu left-flex">
                <NavLink to={appConfig.vacationsRoute}>
                    <div className="menu-icon">
                        <img src={smallArrow} alt="small-arrow" />
                        <img src={flightIcon} alt="flights-icon" />
                    </div>
                </NavLink>
            </div>
        );

    if (user && user.roleId === 2 && location.pathname == "/vacations/")
        return (
            <div className="Menu left-flex">
                <NavLink to={appConfig.homeRoute}>
                    <div className="menu-icon">
                        <img src={smallArrow} alt="small-arrow" />
                        <img src={homeIcon} alt="home-icon" />
                    </div>
                </NavLink>
            </div>
        );

    if (location.pathname == "/home" || location.pathname == "/home/")
        return (
            <div className="Menu right-flex">
                <NavLink to={appConfig.vacationsRoute}>
                    <div className="menu-icon">
                        <img src={flightIcon} alt="flights-icon" />
                        <img src={smallArrow} alt="small-arrow" className="right" />
                    </div>
                </NavLink>
            </div>
        );
}

export default Menu;