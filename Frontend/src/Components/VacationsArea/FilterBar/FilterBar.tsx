import classNames from "classnames";
import { useState } from "react";
import "./FilterBar.css";


type FiltersBarProps = {
    filterAll: Function;
    filterLiked: Function;
    filterOngoing: Function;
    filterFuture: Function;
    setVacations: Function
}


function FilterBar(props: FiltersBarProps): JSX.Element {

    const [activeTab, setActiveTab] = useState<string>("All");


    function filterAll() {
        setActiveTab("All");
        props.setVacations()
        props.filterAll();
    }

    function filterLikes() {
        setActiveTab("My Likes");
        props.filterLiked();
    }

    function filterOngoing() {
        setActiveTab("Ongoing");
        props.filterOngoing();
    }

    function filterFuture() {
        setActiveTab("Future");
        props.filterFuture();
    }



    return (
        <div className="FilterBar">
            <span>Filter:</span>
            <div className="filter-btns">
                <button className={classNames({ "active": activeTab === "All" })} onClick={filterAll}>All</button>
                <div className="separator"></div>
                <button className={classNames({ "active": activeTab === "My Likes" })} onClick={filterLikes}>My Likes</button>
                <div className="separator"></div>
                <button className={classNames({ "active": activeTab === "Ongoing" })} onClick={filterOngoing}>Ongoing</button>
                <div className="separator"></div>
                <button className={classNames({ "active": activeTab === "Future" })} onClick={filterFuture}>Future</button>
            </div>
        </div>
    );
}

export default FilterBar;