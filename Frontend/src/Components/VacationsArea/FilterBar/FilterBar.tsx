import "./FilterBar.css";

function FilterBar(): JSX.Element {
    return (
        <div className="FilterBar">
            <span>Filter:</span>
            <div className="filter-btns">
                <button>All</button>
                <div className="separator"></div>
                <button>My Likes</button>
                <div className="separator"></div>
                <button>Ongoing</button>
                <div className="separator"></div>
                <button>Future</button>
            </div>
        </div>
    );
}

export default FilterBar;
