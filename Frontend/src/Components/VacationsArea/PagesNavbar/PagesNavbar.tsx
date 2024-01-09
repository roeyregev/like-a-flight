import "./PagesNavbar.css";

type PagesNavbarProps = {
    pages: number
    currentPage: number
    setCurrentPage: Function
}

function PagesNavbar(props: PagesNavbarProps): JSX.Element {

    function next(pageNumber: number) {
        props.setCurrentPage(pageNumber + 1);
        console.log(props.currentPage);
    }

    function prev(pageNumber: number) {
        props.setCurrentPage(pageNumber - 1)
    }

    const pagesArray = [];
    for (let i = 1; i <= props.pages; i++) {
        pagesArray.push(i);
    }

    function goToPage(pageNumber: number) {
        props.setCurrentPage(pageNumber);
    }

    return (
        <div className="PagesNavbar">
            <button onClick={() => prev(props.currentPage)} disabled={props.currentPage <= 1}>Prev</button>
            {pagesArray.map(p => <button className="smallBtn" key={p} value={p} onClick={() => goToPage(p)} >{p}</button>)}
            <button onClick={() => next(props.currentPage)} disabled={props.currentPage >= pagesArray.length}>Next</button>
        </div>
    );
}

export default PagesNavbar;
