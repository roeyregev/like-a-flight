import { Navigate, Route, Routes } from "react-router-dom";
import appConfig from "../../../Utils/AppConfig";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import Analytics from "../../VacationsArea/Analytics/Analytics";
import UpdateVacation from "../../VacationsArea/UpdateVacation/UpdateVacation";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Routes>

                {/* Home Route */}
                <Route path={appConfig.homeRoute} element={<Home />} />

                {/* List Route */}
                <Route path={appConfig.vacationsRoute} element={<VacationsList />} />

                {/* Add Route */}
                <Route path={appConfig.addVacationRoute} element={<AddVacation />} />

                {/* Edit Route */}
                <Route path={appConfig.editVacationRoute + ":vacationId"} element={<UpdateVacation />} />

                {/* Analytics Route */}
                <Route path={appConfig.analyticsRoute} element={<Analytics />} />

            //--------------------------------------------------------------------------//
                {/* Register Route */}
                {/* <Route path={appConfig.registerRoute} element={<Register />} /> */}

                {/* Login Route */}
                {/* <Route path={appConfig.loginRoute} element={<Login />} /> */}
            //--------------------------------------------------------------------------//

                {/* Default Route */}
                <Route path="/" element={<Navigate to="/home" />} />

                {/* Page not found Route*/}
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
