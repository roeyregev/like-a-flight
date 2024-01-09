import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import { authStore } from "../../../Redux/AuthState";
import appConfig from "../../../Utils/AppConfig";
import "./Menu.css";

function Menu(): JSX.Element {
    const [user, setUser] = useState<UserModel>()

    useEffect(() => {
        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
            console.log(user);
        });

        return unsubscribe;
    }, [])



    if (user && user.roleId === 1)
        return (
            <div className="Menu">
                <NavLink to={appConfig.vacationsRoute}>Flights</NavLink>
               
                <NavLink to={appConfig.analyticsRoute}>Analytics</NavLink>
            </div>
        );

    if (user && user.roleId === 2)
        return (
            <div className="Menu">
                <NavLink to={appConfig.homeRoute}>Home</NavLink>
                <NavLink to={appConfig.vacationsRoute}>Flights</NavLink>
            </div>
        )
}
export default Menu;