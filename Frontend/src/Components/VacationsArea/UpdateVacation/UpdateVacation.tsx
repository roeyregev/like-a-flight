import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/vacation-model";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import useImagePreview from "../../../Utils/UseImagePreview";
import "./UpdateVacation.css";
import buttonPlusIcon from "../../../Assets/Images/add-photo-plus-icon.svg";
import buttonPlusIconWhite from "../../../Assets/Images/change-photo-plus-icon-.svg";

function UpdateVacation(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState<File | null>();
    const [imgUrl, setImageUrl] = useState<string>("");

    const params = useParams();
    const id = +params.vacationId;


    useEffect(() => {
        vacationsService.getOneVacation(id)
            .then(vacation => {

                console.log(vacation);

                const startDate = vacation.startDate.toString().slice(0, 10);
                const endDate = vacation.startDate.toString().slice(0, 10);
                console.log(startDate);

                setValue("destination", vacation.destination);
                setValue("startDate", startDate);
                setValue("endDate", endDate);
                setValue("price", vacation.price);
                setValue("description", vacation.description);
                setValue("imageUrl", vacation.imageUrl);
                setImageUrl(vacation.imageUrl);
                // setImageFile(vacation.image);
                console.log("DONE");
            })
            .catch(err => notificationService.error(err))
    }, []);

    const imageSrc = useImagePreview(imageFile);

    function handleFileChange(event: any) {
        const files = event.target.files;
        if (!files || !files.item(0)) return;
        setImageFile(files.item(0));
    }


    async function update(vacation: VacationModel) {
        try {
            console.log(vacation);
            vacation.vacationId = id;

            //extract and assign image file to vacation object:
            vacation.image = (vacation.image as unknown as FileList)[0];

            //add vacation:
            const updatedVacation = await vacationsService.updateVacation(vacation);
            notificationService.success("Flight was updated!");
            navigate("/vacations");
        }
        catch (err: any) {
            notificationService.error(err);
        }
    }


    return (
        <div className="UpdateVacation">
            <h2> Update Flight</h2>

            <form onSubmit={handleSubmit(update)}>
                <input placeholder="Destination" {...register("destination")} />
                <div className="dates-inputs">
                    <input type="date" {...register("startDate")} />
                    <input type="date" {...register("endDate")} />
                </div>

                <input type="number" placeholder="Price" step="0.01" {...register("price")} />
                <textarea placeholder="Description" cols={30} rows={10} {...register("description")}></textarea>

                {/* <div className="image-upload">
                    <label>Image: </label>
                    <input type="file" accept="image/*" {...register("image")} onChange={handleFileChange} />
                    <img src={imageSrc ? imageSrc : imgUrl} />
                </div> */}

                <div className="image-upload">

                    <label>Image:</label>
                    <div className="image-thumbnail">
                        <input type="file" accept="image/*"  {...register("image")} onChange={handleFileChange} required className="upload-input" />

                        {!imageSrc ?
                            <div className="tn-preview">
                                <img src={imgUrl} alt="img-url" className="img-preview" />
                                <button className="change-btn"><img src={buttonPlusIconWhite} alt="button-plus-icon" />Change</button>
                            </div> :
                            <div className="tn-preview">
                                <img src={imageSrc} alt="img-preview" className="img-preview" />
                                <button className="change-btn"><img src={buttonPlusIconWhite} alt="button-plus-icon" />Change</button>
                            </div>
                        }

                    </div>

                </div>
                <div className="btns-flex">
                    <button>Update Flight</button>
                    <button>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateVacation;
