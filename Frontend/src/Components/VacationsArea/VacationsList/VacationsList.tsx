import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { NavLink } from "react-router-dom";
import loader from "../../../Assets/Animations/loader.json";
import largePlusIcon from "../../../Assets/Images/plus-icon-large.svg";
import UserModel from "../../../Models/user-model";
import VacationModel from "../../../Models/vacation-model";
import { authStore } from "../../../Redux/AuthState";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import appConfig from "../../../Utils/AppConfig";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";
import FilterSelector from "../FilterSelector/FilterSelector";
import NoVacations from "../NoVacations/NoVacations";
import PagesNavbar from "../PagesNavbar/PagesNavbar";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";

export type Filters = {
    id: number;
    name: string;
    isSelected: boolean
}

function VacationsList(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [noVacations, setNoVacations] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [numOfPages, setNumOfPages] = useState<number>(1);
    const vacationsPerPage = 9;

    const [filters, setFilters] = useState<Filters[]>([
        { id: 1, name: "Show all flights", isSelected: true },
        { id: 2, name: "Show my Liked flights", isSelected: false },
        { id: 3, name: "Show current flights", isSelected: false },
        { id: 4, name: "Show future flights", isSelected: false },
    ]);

    //Get user state
    useEffect(() => {
        const user = authStore.getState().user;
        setUser(user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return unsubscribe;
    }, []);

    // Get all vacations:
    useEffect(() => {
        if (!user) return;

        vacationsService.getAllVacations(user.userId)
            .then(dbVacations => {
                setVacations(dbVacations);
                setNumOfPages(Math.ceil(dbVacations.length / vacationsPerPage));
                setCurrentPage(1);
                setLoading(false);
            })
            .catch(err => {
                notificationService.error(err);
                setLoading(false);
            });
    }, [currentPage, user]);

    //Set pagination function
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

    //filters switch states:
    const filteredVacations = () => {
        const selectedFilterId = filters.find(t => t.isSelected).id;
        const now = new Date;
        const formattedNow = now.toISOString();

        switch (selectedFilterId) {
            case 1:
                return vacations
            case 2:
                return vacations.filter(v => v.isFollowing);
            case 3:
                return vacations.filter((v) => v.startDate <= formattedNow && v.endDate >= formattedNow);
            case 4:
                return vacations.filter((v) => v.startDate >= formattedNow);
        }
    }

    const handleSelectedFilter = (filterId: number) => {
        setFilters(filters => filters.map(f => {
            f.id === filterId ? f.isSelected = true : f.isSelected = false;
            return f
        }))
    }

    //pagination params:
    const { activePage, nextPage, previousPage, totalPages, items } = usePagination(filteredVacations());

    //check if a filter's list is empty:
    useEffect(() => {
        if (items.length === 0 && !loading) {
            setNoVacations(true);
        } else {
            setNoVacations(false);
        }
    }, [items, loading]);

    //Like's toggle function:
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

    //loader animation settings:
    const loaderOptions = {
        animationData: loader,
        loop: true,
        autoplay: true,
    }
    

    //Render options:
    if ((user && vacations.length === 0 || !vacations) && !loading) return (<NoVacations />);

    if (user?.roleId === 1)
        return (
            <div className="VacationsList">
                <h2> Our Flights</h2>
                <NavLink to={appConfig.addVacationRoute} className="add-btn">
                    <img src={largePlusIcon} alt="large-plus-icon" />
                    <h3>Add-A-Flight</h3>
                </NavLink>
                <PagesNavbar pages={numOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} nextPage={nextPage} totalPages={totalPages} previousPage={previousPage} activePage={activePage} />

                {loading ? <div className="loader"> <Lottie options={loaderOptions} /></div> :
                    <div className="cards-list">
                        {items.map(v => <AdminVacationCard key={v.vacationId} vacation={v} setVacations={setVacations} vacations={vacations} user={user} />)}
                    </div>}
                <PagesNavbar pages={numOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} nextPage={nextPage} totalPages={totalPages} previousPage={previousPage} activePage={activePage} />
            </div>
        );

    if (user?.roleId === 2)
        return (
            <div className="VacationsList">
                <h2> Our Flights</h2>
                {/* <FilterSelector filters={filters}  /> */}
                <FilterSelector filters={filters} handleSelectedFilter={handleSelectedFilter} />
                <PagesNavbar pages={numOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} nextPage={nextPage} totalPages={totalPages} previousPage={previousPage} activePage={activePage} />

                {loading ? <div className="loader"> <Lottie options={loaderOptions} /></div> :
                    <div className="cards-list">
                        {!noVacations ?
                            items.map(v => <VacationCard key={v.vacationId} vacation={v} userId={user.userId} vacations={vacations} setVacations={setVacations} likeToggle={likeToggle} />) :
                            <p className="empty-filter">Sorry. No flights in this list :(</p>}
                    </div>
                }
                <PagesNavbar pages={numOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} nextPage={nextPage} totalPages={totalPages} previousPage={previousPage} activePage={activePage} />
            </div>
        );
}

export default VacationsList;