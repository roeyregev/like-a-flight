import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import buttonPlusIcon from "../../../Assets/Images/add-photo-plus-icon.svg";
import buttonPlusIconWhite from "../../../Assets/Images/change-photo-plus-icon-.svg";
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

            //validate dates logic:
            if (vacation.endDate < vacation.startDate) {
                throw new Error("End date can't be earlier than Start date");
            }

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
                <input placeholder="Destination" {...register("destination")} required />
                <div className="dates-inputs">
                    <input type="date" placeholder="Start date" {...register("startDate")} required />
                    <span>-</span>
                    <input type="date" placeholder="End date" {...register("endDate")} required />
                </div>

                <input type="number" placeholder="Price ($)" {...register("price")} min={0} max={10000} required />
                <textarea placeholder="Description" cols={30} rows={10} {...register("description")} required></textarea>

                <div className="image-upload">
                    <label>Image:</label>
                    <div className="image-thumbnail">
                        <input type="file" accept="image/*"  {...register("image")} onChange={handleFileChange} required className="upload-input" />
                        {!imageSrc ?
                            <div className="tn-preview">
                                <button><img src={buttonPlusIcon} alt="button-plus-icon" /> Add photo</button>
                            </div> :
                            <div className="tn-preview">
                                <img src={imageSrc} alt="" className="img-preview" />
                                <button className="change-btn"><img src={buttonPlusIconWhite} alt="button-plus-icon" /> Change</button>
                            </div>
                        }
                    </div>
                </div>

                <div className="btns-flex">
                    <button type="submit">Add Flight</button>
                    <button type="button" onClick={() => navigate("/vacations")}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddVacation;
