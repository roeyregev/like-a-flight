// import Select from 'react-select'
import classNames from "classnames";
import { Tabs } from "../VacationsList/VacationsList";
import "./FilterSelector.css";
import { SyntheticEvent } from "react";

type FiltersBarProps = {
    tabs: Tabs[]
    handleClickedTab: Function
}



function FilterSelector(props: FiltersBarProps): JSX.Element {


    function handleChange(args: SyntheticEvent): void {
        const selectElement: HTMLSelectElement = args.target as HTMLSelectElement;
        const tabValue = +selectElement.value;
        console.log("tabValue: " + tabValue);
        props.handleClickedTab(tabValue);
    }

    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    // ]

    // const tabs = [
    //     { value: 1, label: "All" },
    //     { value: 2, label: "My Likes" },
    //     { value: 3, label: "Ongoing" },
    //     { value: 4, label: "Future" },
    // ]


    // return (
    //     <div className="FilterSelector">
    //         <Select options={tabs} />
    //         {/* <Select options={tabs} onChange={handleChange}/> */}
    //     </div >
    // );

    return (
        <div className="FilterSelector">
            <div className="custom-select" >
                <select name="filter-selector" onChange={handleChange}>
                    {/* <select name="filter-selector" onChange = {() => props.handleClickedTab(t.id)}> */}
                    {props.tabs.map(
                        t => (<option defaultValue="1" className={classNames({ "active": t.isSelected })} value={t.id} key={t.id} >{t.name}</option>)
                    )}
                </select>
            </div>
        </div >
    );
}

export default FilterSelector;
