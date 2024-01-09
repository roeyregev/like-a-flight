import { ReactNode, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import VacationModel from "../../../Models/vacation-model";
import { authStore } from "../../../Redux/AuthState";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import appConfig from "../../../Utils/AppConfig";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";
import FilterBar from "../FilterBar/FilterBar";
import PagesNavbar from "../PagesNavbar/PagesNavbar";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";


function VacationsList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [numOfPages, setNumOfPages] = useState<number>(1);
    const [user, setUser] = useState<UserModel>()
    const vacationsPerPage = 4;

    //Get user state
    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return unsubscribe;
    }, [])


    // // Get nine vacations each time:
    // useEffect(() => {
    //     if (!user) return;

    //     vacationsService.getNineVacations(currentPage, user.userId)
    //         .then(dbVacations => {
    //             setVacations(dbVacations);
    //         })
    //         .catch(err => notificationService.error(err))
    // }, [currentPage, user, vacations])


    // Get all vacations:
    useEffect(() => {
        if (!user) return;
        console.log(user);

        vacationsService.getAllVacations(user.userId)
            .then(dbVacations => {
                setVacations(dbVacations);
                setNumOfPages(Math.ceil(dbVacations.length / vacationsPerPage));
                setCurrentPage(1);
                console.log(dbVacations);
            })
            .catch(err => notificationService.error(err))
    }, [currentPage, user])


    // useEffect(() => {
    //     vacationsService.getVacationsData()
    //         .then(data => {
    //             setNumOfPages(Math.ceil(data.count / 4));
    //         })
    //         .catch(err => notificationService.error(err))
    // }, [])

   

    if (!user)
        return (
            <div>
                <p>You have to log in</p>
                <button>Login</button>
                <button>Back to Homepage</button>
            </div>
        );

    if (user && user.roleId === 1)
        return (
            <div className="VacationsList">
                <h2> Our Flights</h2>
                <NavLink to={appConfig.addVacationRoute} className="add-btn"> Add-A-Flight</NavLink>
                <PagesNavbar pages={numOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                <div className="cards-list">
                    {vacations.map(v => <AdminVacationCard key={v.vacationId} vacation={v} />)}
                    {/* {vacations.map(v => <AdminVacationCard key={v.vacationId} vacation={v} />)} */}
                </div>
            </div>
        );


    if (user && user.roleId === 2)
        return (
            <div className="VacationsList">
                <h2> Our Flights</h2>
                <FilterBar />
                <PagesNavbar pages={numOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                <div className="cards-list">
                    {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} userId={user.userId} />)}
                </div>
            </div>
        );
}

export default VacationsList;
