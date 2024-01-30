import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import { authStore } from "../../../Redux/AuthState";
import appConfig from "../../../Utils/AppConfig";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import Analytics from "../../VacationsArea/Analytics/Analytics";
import UpdateVacation from "../../VacationsArea/UpdateVacation/UpdateVacation";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import PageNotFound from "../PageNotFound/PageNotFound";


function PrivateRoute({ element }: any): JSX.Element {
    console.log('auth: ',authStore.getState().user)
    return authStore.getState().user ? (element) : (<Navigate to={appConfig.homeRoute} state={{ showPopup: true }} replace />);
}

function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Routes>

                {/* Home Route */}
                <Route path={appConfig.homeRoute} element={<Home />} />

                {/* List Route */}
                {/* <Route path={appConfig.vacationsRoute} element={<VacationsList />} /> */}
                <Route path={appConfig.vacationsRoute} element={<PrivateRoute element={<VacationsList />} />} />

                {/* Add Route */}
                <Route path={appConfig.addVacationRoute} element={<PrivateRoute element={<AddVacation />} />} />
                {/* <Route path={appConfig.addVacationRoute} element={<AddVacation />} /> */}

                {/* Edit Route */}
                <Route path={appConfig.editVacationRoute + ":vacationId"} element={<PrivateRoute element={<UpdateVacation />} />} />
                {/* <Route path={appConfig.editVacationRoute + ":vacationId"} element={<UpdateVacation />} /> */}

                {/* Analytics Route */}
                <Route path={appConfig.analyticsRoute} element={<PrivateRoute element={<Analytics />} />} />
                {/* <Route path={appConfig.analyticsRoute} element={<Analytics />} /> */}

                {/* Default Route */}
                <Route path="/" element={<Navigate to="/home" />} />

                {/* Page not found Route*/}
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
