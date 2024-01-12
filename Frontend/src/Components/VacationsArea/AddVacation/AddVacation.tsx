import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/vacation-model";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import useImagePreview from "../../../Utils/UseImagePreview";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const { register, handleSubmit } = useForm<VacationModel>()
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState<File | null>();


    const imageSrc = useImagePreview(imageFile);

    function handleFileChange(event: any) {
        const files = event.target.files;
        if (!files || !files.item(0)) return;
        setImageFile(files.item(0));
    }

    async function send(vacation: VacationModel) {
        try {
            console.log(vacation);
             
            //extract and assign image file to vacation object:
            vacation.image = (vacation.image as unknown as FileList)[0];

            //add vacation:
            await vacationsService.addVacation(vacation);
            notificationService.success("Flight was added!");
            navigate("/vacations");
        }
        catch (err: any) {
            notificationService.error(err);
        }
    }


    return (
        <div className="AddVacation">
            <h2> Add a Flight</h2>

            <form onSubmit={handleSubmit(send)}>
                <input placeholder="Destination" {...register("destination")} />
                <div className="dates-inputs">
                    <input type="date" placeholder="Start date" {...register("startDate")} />
                    <input type="date" placeholder="End date" {...register("endDate")} />
                </div>

                <input type="number" placeholder="Price" {...register("price")} />
                <textarea placeholder="Description" cols={30} rows={10} {...register("description")}></textarea>

                <div className="image-upload">
                    <label>Image: </label>
                    <input type="file" accept="image/*" {...register("image")} onChange={handleFileChange} />
                    <img src={imageSrc} />
                </div>
                <button>Add Flight</button>
                <button>Cancel</button>
            </form>
        </div>
    );
}

export default AddVacation;
