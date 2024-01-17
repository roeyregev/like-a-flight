import classNames from "classnames";
import { useState } from "react";
import "./FilterBar.css";
import vacationsService from "../../../Services/VacationsService";
import { Tabs } from "../VacationsList/VacationsList";

type FiltersBarProps = {
    tabs: Tabs[]
    handleClickedTab: Function
}

function FilterBar(props: FiltersBarProps): JSX.Element {

    return (
        <div className="FilterBar">
            <span>Filter:</span>
            <div className="filter-btns">
                {props.tabs.map(
                    t => (<span key={t.id}>
                        <button className={classNames({ "active": t.isSelected })}
                            onClick={() => props.handleClickedTab(t.id)}>{t.name}</button>
                        <div className="separator"></div>
                    </span>)
                )}

            </div>
        </div>
    );
}

export default FilterBar;