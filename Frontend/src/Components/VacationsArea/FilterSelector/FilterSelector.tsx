import Select, { CSSObjectWithLabel, StylesConfig } from 'react-select';
import filterIcon from "../../../Assets/Images/filter-icon.svg";
import { Filters } from "../VacationsList/VacationsList";
import "./FilterSelector.css";
import { useEffect, useState } from 'react';

type FiltersBarProps = {
    filters: Filters[]
    handleSelectedFilter: Function
}

function FilterSelector(props: FiltersBarProps): JSX.Element {

    const [filters, setFilters] = useState([{ value: props.filters[0].id, label: props.filters[0].name }])

    //"react-select" select-bar options array:
    useEffect(() => {
        setFilters(props.filters.map(f => ({ value: f.id, label: f.name })))
    }, [])

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