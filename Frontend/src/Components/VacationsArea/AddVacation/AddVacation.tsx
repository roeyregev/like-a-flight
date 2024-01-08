import { useForm } from "react-hook-form";
import "./AddVacation.css";
import VacationModel from "../../../Models/vacation-model";

function AddVacation(): JSX.Element {

    const { register, handleSubmit } = useForm<VacationModel>()


    return (
        <div className="AddVacation">
            <h2> Add vacation</h2>

            <form>
                <input placeholder="Destination" />
                <div className="dates-inputs">
                    <input type="date" placeholder="Start date" />
                    <input type="date" placeholder="End date" />
                </div>
                
                <input type="number" placeholder="Price" />
                <textarea placeholder="Description" cols={30} rows={10}></textarea>

                <div>
                    <label>Image: </label>
                    <input type="file" />
                </div>
                <button>Add Flight</button>
                <button>Cancel</button>
            </form>
        </div>
    );
}

export default AddVacation;
