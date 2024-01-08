import { useEffect, useState } from "react";
import VacationModel from "../../../Models/vacation-model";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import PagesNavbar from "../PagesNavbar/PagesNavbar";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";
import { authStore } from "../../../Redux/AuthState";
import UserModel from "../../../Models/user-model";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";


function VacationsList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [numOfPages, setNumOfPages] = useState<number>(1);
    const [user, setUser] = useState<UserModel>()


    useEffect(() => {
        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
            console.log(user);
        });

        return unsubscribe;
    }, [])


    useEffect(() => {
        if (!user) return;

        vacationsService.getNineVacations(currentPage, user.userId)
            .then(dbVacations => {
                setVacations(dbVacations);
                // console.log(dbVacations);
            })
            .catch(err => notificationService.error(err))
    }, [currentPage, user, vacations])


    useEffect(() => {
        vacationsService.getVacationsData()
            .then(data => {
                setNumOfPages(Math.ceil(data.count / 4));
            })
            .catch(err => notificationService.error(err))
    }, [])


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

                <PagesNavbar pages={numOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                <div className="cards-list">
                    {vacations.map(v => <AdminVacationCard key={v.vacationId} vacation={v} />)}
                </div>
            </div>
        );


    if (user && user.roleId === 2)
        return (
            <div className="VacationsList">
                <h2> Our Flights</h2>

                <PagesNavbar pages={numOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                <div className="cards-list">
                    {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} userId={user.userId} />)}
                </div>
            </div>
        );
}

export default VacationsList;
