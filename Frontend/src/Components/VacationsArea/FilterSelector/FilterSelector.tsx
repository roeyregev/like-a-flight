import Select, { CSSObjectWithLabel, StylesConfig } from 'react-select';
import filterIcon from "../../../Assets/Images/filter-icon.svg";
import { Filters } from "../VacationsList/VacationsList";
import "./FilterSelector.css";
import VacationModel from '../../../Models/vacation-model';

type FiltersBarProps = {
    filters: Filters[]
    handleSelectedFilter: Function
}

function FilterSelector(props: FiltersBarProps): JSX.Element {

    //"react-select" selection options:
    const filters = [
        { value: 1, label: "Show all flights" },
        { value: 2, label: "Show my Liked flights" },
        { value: 3, label: "Show current flights" },
        { value: 4, label: "Show future flights" },
    ]

    //"react-select" select bar styles:
    const styles: StylesConfig<{ value: number; label: string }, false, any> = {
        control: (provided: CSSObjectWithLabel, state: any) => ({
            ...provided,
            border: 'none',
            boxShadow: 'none',
            backgroundColor: '#FEEDD9',
            color: '#9D3B3B',
            padding: 0

        }),
        option: (provided: CSSObjectWithLabel, state: any) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#FAE5CD' : '#FEEDD9',
            color: state.isSelected ? '#9D3B3B' : '#9D3B3B',

        }),
        singleValue: (base: CSSObjectWithLabel, state: any) => ({
            ...base,
            color: '#9D3B3B',
        }),
        indicatorSeparator: (base: CSSObjectWithLabel, state: any) => ({
            ...base,
            backgroundColor: 'none',
        }),
        dropdownIndicator: (base: CSSObjectWithLabel, state: any) => ({
            ...base,
            color: '#FBAFAF',
            ':hover': {
                color: '#EC8A8A',
            },
            ':active': {
                color: '#EC8A8A',
            },
        }),
    };

    //Handle filter selection:
    function handleChange(selectedOption: any): void {
        console.log(selectedOption.value);
        props.handleSelectedFilter(selectedOption.value);
    }

    return (
        <div className="FilterSelector">
            <div className="filter-flex">
                <img src={filterIcon} alt="filter-icon" />
                <Select options={filters} onChange={handleChange} defaultValue={filters[0]} styles={styles} isSearchable={false} className="select-bar" />
            </div>
        </div >
    );
}

export default FilterSelector;