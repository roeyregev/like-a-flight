import { useEffect, useState } from "react";
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
import { setLabels } from "react-chartjs-2/dist/utils";



function VacationsList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([])
    const [originalVacations, setOriginalVacations] = useState<VacationModel[]>(vacations);
    const [user, setUser] = useState<UserModel>()
    const [token, setToken] = useState<string>("")

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [numOfPages, setNumOfPages] = useState<number>(1);
    const vacationsPerPage = 4;

    const usePagination = (items: VacationModel[], page = 1, perPage = vacationsPerPage) => {
        const [activePage, setActivePage] = useState(page)
        const totalPages = Math.ceil(items.length / perPage)
        const offset = perPage * (activePage - 1)
        const paginatedItems = items.slice(offset, perPage * activePage)

        return {
            activePage,
            nextPage: () => setActivePage(p => p < totalPages ? p + 1 : p),
            previousPage: () => setActivePage(p => p > 1 ? p - 1 : p),
            totalPages,
            totalItems: items.length,
            items: paginatedItems,
        }
    }

    const { activePage, nextPage, previousPage, totalPages, totalItems, items } = usePagination(vacations);

    //Get user state
    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
            console.log()
        });
        return unsubscribe;
    }, [])

    // Get all vacations:
    useEffect(() => {
        if (!user) return;
        console.log(user);

        vacationsService.getAllVacations(user.userId)
            .then(dbVacations => {
                setVacations(dbVacations);
                setOriginalVacations(dbVacations);
                setNumOfPages(Math.ceil(dbVacations.length / vacationsPerPage));
                setCurrentPage(1);
                console.log(dbVacations);
            })
            .catch(err => notificationService.error(err))
    }, [currentPage, user]);


    //---------------------------------------------------------------------------------------------------------------------------------
    // Filters functions:

    function filterAll() {
        console.log(originalVacations);
        setVacations(originalVacations);
    }

    function filterLiked() {
        const likedVacations = originalVacations.filter((v) => v.isFollowing != 0);
        console.log(likedVacations);
        setVacations(likedVacations)
    }

    function filterOngoing() {
        const now = new Date;
        const formattedNow = now.toISOString();
        const ongoingVacations = originalVacations.filter((v) => v.startDate >= formattedNow && v.endDate <= formattedNow);
        console.log(ongoingVacations)
        setVacations(ongoingVacations);
    }

    function filterFuture() {
        const now = new Date;
        const formattedNow = now.toISOString();
        const futureVacations = originalVacations.filter((v) => v.startDate >= formattedNow);
        console.log(futureVacations);
        setVacations(futureVacations);
    }
    //---------------------------------------------------------------------------------------------------------------------------------


    if (!user)
        return (
            <div>
                <p>You have to log in</p>
                <button>Login</button>
                <button>Back to Homepage</button>
            </div>
        );

    if (user.roleId === 1)
        return (
            <div className="VacationsList">
                <h2> Our Flights</h2>
                <NavLink to={appConfig.addVacationRoute} className="add-btn"> Add-A-Flight</NavLink>
                <PagesNavbar pages={numOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} nextPage={nextPage} totalPages={totalPages} previousPage={previousPage} activePage={activePage} />

                <div className="cards-list">
                    {items.map(v => <AdminVacationCard key={v.vacationId} vacation={v} setVacations={setVacations} vacations={vacations} user={user} />)}
                </div>
            </div>
        );


    if (user.roleId === 2)
        return (
            <div className="VacationsList">
                <h2> Our Flights</h2>
                <FilterBar filterAll={filterAll} filterLiked={filterLiked} filterOngoing={filterOngoing} filterFuture={filterFuture} setVacations={setVacations} />
                <PagesNavbar pages={numOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} nextPage={nextPage} totalPages={totalPages} previousPage={previousPage} activePage={activePage} />

                <div className="cards-list">
                    {items.map(v => <VacationCard key={v.vacationId} vacation={v} userId={user.userId} vacations={vacations} setVacations={setVacations} />)}
                </div>
            </div>
        );
}

export default VacationsList;
