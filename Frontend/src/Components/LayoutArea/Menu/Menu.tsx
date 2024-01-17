import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import { authStore } from "../../../Redux/AuthState";
import appConfig from "../../../Utils/AppConfig";
import "./Menu.css";

function Menu(): JSX.Element {
    const [user, setUser] = useState<UserModel>()
    const location = useLocation();
    console.log(location.pathname);

    useEffect(() => {
        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
            console.log(user);
        });

        return unsubscribe;
    }, [])



    if (user && user.roleId === 1 && location.pathname == "/vacations/")
        return (
            <div className="Menu">
                <NavLink to={appConfig.analyticsRoute}>Analytics</NavLink>
            </div>
        );

    if (user && user.roleId === 1 && location.pathname == "/vacations/analytics/")
        return (
            <div className="Menu">
                <NavLink to={appConfig.vacationsRoute}>Flights</NavLink>
            </div>
        );

    if (user && user.roleId === 2 && location.pathname == "/vacations/")
        return (
            <div className="Menu">
                <NavLink to={appConfig.homeRoute}>Home</NavLink>
            </div>
        );

    if (user && user.roleId === 2 && location.pathname == "/home/")
        return (
            <div className="Menu">
                <NavLink to={appConfig.vacationsRoute}>Flights</NavLink>
            </div>
        );
}
export default Menu;