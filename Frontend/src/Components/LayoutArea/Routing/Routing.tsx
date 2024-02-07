import { jwtDecode } from "jwt-decode";
import { Navigate, Route, Routes } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import appConfig from "../../../Utils/AppConfig";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import Analytics from "../../VacationsArea/Analytics/Analytics";
import UpdateVacation from "../../VacationsArea/UpdateVacation/UpdateVacation";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import PageNotFound from "../PageNotFound/PageNotFound";

const isExpired = () => {
    const token = localStorage.getItem("token");
    if (!token) return false

    const expirationTime = jwtDecode(token).exp;
    const now = new Date().getTime() / 1000;

    if (now > expirationTime) {
        authService.logout();
        return true
    }
}

function PrivateRoute({ element }: any): JSX.Element {
    console.log('auth: ', authStore.getState().user)
    return authStore.getState().user && !isExpired() ? (element) : (<Navigate to={appConfig.homeRoute} state={{ showPopup: true }} replace />);
}

function AdminRoute({ element }: any): JSX.Element {
    console.log('auth: ', authStore.getState().user)
    return authStore.getState().user && !isExpired() && authStore.getState().user.roleId === 1 ? (element) : (<Navigate to={appConfig.homeRoute} state={{ showAdminPopup: true }} replace />);
}

function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Routes>

                {/* Home Route */}
                <Route path={appConfig.homeRoute} element={<Home />} />

                {/* List Route */}
                <Route path={appConfig.vacationsRoute} element={<PrivateRoute element={<VacationsList />} />} />

                {/* Add Flight Route */}
                <Route path={appConfig.addVacationRoute} element={<AdminRoute element={<AddVacation />} />} />

                {/* Edit Flight Route */}
                <Route path={appConfig.editVacationRoute + ":vacationId"} element={<AdminRoute element={<UpdateVacation />} />} />

                {/* Analytics Route */}
                <Route path={appConfig.analyticsRoute} element={<AdminRoute element={<Analytics />} />} />

                {/* Default Route */}
                <Route path="/" element={<Navigate to="/home" />} />

                {/* Page not found Route*/}
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
