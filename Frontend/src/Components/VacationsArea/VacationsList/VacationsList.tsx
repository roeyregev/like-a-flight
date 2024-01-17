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

export type Tabs = {
    id: number;
    name: string;
    isSelected: boolean
}

function VacationsList(): JSX.Element {
    const [user, setUser] = useState<UserModel>()
    const [vacations, setVacations] = useState<VacationModel[]>([])

    const [tabs, setTabs] = useState<Tabs[]>([
        { id: 1, name: "All", isSelected: true },
        { id: 2, name: "My Likes", isSelected: false },
        { id: 3, name: "Ongoing", isSelected: false },
        { id: 4, name: "Future", isSelected: false },
    ]);

    const handleClickedTab = (id: number) => {
        setTabs(tabs => tabs.map(t => {
            t.id === id ? t.isSelected = true : t.isSelected = false;
            return t
        }))
    }

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

    const filteredVacations = () => {
        const selectedTabId = tabs.find(t => t.isSelected).id;
        const now = new Date;
        const formattedNow = now.toISOString();

        switch (selectedTabId) {
            case 1:
                return vacations
            case 2:
                return vacations.filter(v => v.isFollowing);
            case 3:
                return vacations.filter((v) => v.startDate >= formattedNow && v.endDate <= formattedNow);
            case 4:
                return vacations.filter((v) => v.startDate >= formattedNow);
        }
    }

    const { activePage, nextPage, previousPage, totalPages, totalItems, items } = usePagination(filteredVacations());


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
                // setOriginalVacations(dbVacations);
                setNumOfPages(Math.ceil(dbVacations.length / vacationsPerPage));
                setCurrentPage(1);
                console.log(dbVacations);
            })
            .catch(err => notificationService.error(err))
    }, [currentPage, user]);


    async function likeToggle(vacId: number) {

        setVacations(v => v.map(_vacation =>
            _vacation.vacationId === vacId
                ? { ..._vacation, isFollowing: _vacation.isFollowing ? 0 : 1, likes: _vacation.isFollowing ? _vacation.likes - 1 : _vacation.likes + 1 }
                : _vacation
        ));

        vacations.find(v => v.vacationId === vacId).isFollowing ?
            vacationsService.unLikeVacation(vacId, user.userId) :
            vacationsService.likeVacation(vacId, user.userId);
    }


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
                <FilterBar tabs={tabs} handleClickedTab={handleClickedTab} />
                <PagesNavbar pages={numOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} nextPage={nextPage} totalPages={totalPages} previousPage={previousPage} activePage={activePage} />

                <div className="cards-list">
                    {items.map(v => <VacationCard key={v.vacationId} vacation={v} userId={user.userId} vacations={vacations} setVacations={setVacations} likeToggle={likeToggle} />)}
                </div>
            </div>
        );
}

export default VacationsList;