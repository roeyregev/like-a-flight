import "./PagesNavbar.css";
import arrowIcon from "../../../Assets/Images/arrow-icon-small.svg"

type PagesNavbarProps = {
    pages: number
    currentPage: number
    setCurrentPage: Function
    nextPage: Function
    previousPage: Function
    totalPages: number
    activePage: number
}

function PagesNavbar(props: PagesNavbarProps): JSX.Element {

    function nextPage() {
        props.nextPage()
    }

    function previousPage() {
        props.previousPage()
    }

    const pagesArray = [];
    for (let i = 1; i <= props.totalPages; i++) {
        pagesArray.push(i);
    }

    // function goToPage(pageNumber: number) {
    //     console.log("Test")
    // }


    return (
        <div className="PagesNavbar">
            <button onClick={previousPage} disabled={props.activePage <= 1}>
                <img src={arrowIcon} alt="arrow-icon" />
            </button>
            {/* {pagesArray.map(p => <button className="smallBtn" key={p} value={p} onClick={() => goToPage(p)}>{p}</button>)} */}
            <p>page {props.activePage}/{props.totalPages}</p>
            <button onClick={nextPage} disabled={props.activePage >= props.totalPages}>
                <img src={arrowIcon} alt="arrow-icon" className="right" />
            </button>
        </div>
    );
}

export default PagesNavbar;
