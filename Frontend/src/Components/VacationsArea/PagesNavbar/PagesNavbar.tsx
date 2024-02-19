import arrowIcon from "../../../Assets/Images/arrow-icon-small.svg";
import "./PagesNavbar.css";

type PagesNavbarProps = {
    pages: number
    currentPage: number
    setCurrentPage: Function
    nextPage: Function
    previousPage: Function
    totalPages: number
    activePage: number
}

const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0 });
};

function PagesNavbar(props: PagesNavbarProps): JSX.Element {

    function nextPage() {
        props.nextPage()
        scrollToTop()
    }

    function previousPage() {
        props.previousPage()
        scrollToTop()
    }

    const pagesArray = [];
    for (let i = 1; i <= props.totalPages; i++) {
        pagesArray.push(i);
    }

    return (
        <div className="PagesNavbar">
            <button onClick={previousPage} disabled={props.activePage <= 1}>
                <img src={arrowIcon} alt="arrow-icon" />
            </button>
            <p>page {props.activePage}/{props.totalPages}</p>
            <button onClick={nextPage} disabled={props.activePage >= props.totalPages}>
                <img src={arrowIcon} alt="arrow-icon" className="right" />
            </button>
        </div>
    );
}

export default PagesNavbar;