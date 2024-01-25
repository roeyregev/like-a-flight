import Select from 'react-select'
import classNames from "classnames";
import { Tabs } from "../VacationsList/VacationsList";
import "./FilterSelector.css";
import { SyntheticEvent } from "react";
import filterIcon from "../../../Assets/Images/filter-icon.svg"

type FiltersBarProps = {
    tabs: Tabs[]
    handleClickedTab: Function
}

function FilterSelector(props: FiltersBarProps): JSX.Element {


    // function handleChange(args: SyntheticEvent): void {
    //     const selectElement: HTMLSelectElement = args.target as HTMLSelectElement;
    //     const tabValue = +selectElement.value;
    //     console.log("tabValue: " + tabValue);
    //     props.handleClickedTab(tabValue);
    // }


    const tabs = [
        { value: 1, label: "Show all flights" },
        { value: 2, label: "Show my Liked flights" },
        { value: 3, label: "Show current flights" },
        { value: 4, label: "Show future flights" },
    ]

    function handleChange2(selectedOption: any): void {
        props.handleClickedTab(selectedOption.value);
    }

    return (
        <div className="FilterSelector">
            <div className="filter-flex">
                <img src={filterIcon} alt="filter-icon" />
                <Select options={tabs} onChange={handleChange2} defaultValue={tabs[0]} className="select-bar"/>
            </div>
        </div >
    );

    // return (
    //     <div className="FilterSelector">
    //         <div className="custom-select" >
    //             <select name="filter-selector" onChange={handleChange}>
    //                 {/* <select name="filter-selector" onChange = {() => props.handleClickedTab(t.id)}> */}
    //                 {props.tabs.map(
    //                     t => (<option defaultValue="1" className={classNames({ "active": t.isSelected })} value={t.id} key={t.id} >{t.name}</option>)
    //                 )}
    //             </select>               
    //         </div>
    //         <Select options={tabs} />
    //     </div >
    // );
}

export default FilterSelector;
