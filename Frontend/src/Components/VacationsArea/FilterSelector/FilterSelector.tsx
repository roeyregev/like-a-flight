import { Tabs } from "../VacationsList/VacationsList";
import "./FilterSelector.css";

import filterIcon from "../../../Assets/Images/filter-icon.svg"
import classNames from "classnames";

type FiltersBarProps = {
    tabs: Tabs[]
    handleClickedTab: Function
  
}

function FilterSelector(props: FiltersBarProps): JSX.Element {
    return (
        <div className="FilterSelector">

            <select name="filter-selector" onChange = {()=> console.log("test")}>
                {props.tabs.map(
                    t => (<option className={classNames({ "active": t.isSelected })} value={t.id} key={t.id} >{t.name}</option>)
                )}
            </select>
        </div>
    );
}

export default FilterSelector;
