import classNames from "classnames";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import buttonPlusIcon from "../../../Assets/Images/add-photo-plus-icon.svg";
import buttonPlusIconWhite from "../../../Assets/Images/change-photo-plus-icon-.svg";
import redChupchik from "../../../Assets/Images/redChupchick.svg";
import VacationModel from "../../../Models/vacation-model";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import useImagePreview from "../../../Utils/UseImagePreview";
import "./AddVacation.css";

function AddVacation(): JSX.Element {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<VacationModel>()
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

            //validate dates logic:
            if (vacation.endDate < vacation.startDate) {
                throw new Error("End date can't be earlier than Start date");
            }

            const localeDate = new Date(vacation.startDate);
            console.log(localeDate);

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

    const onError = (errors: FieldErrors<VacationModel>) => {
        console.log("Form errors: ", errors)
    }

    return (
        <div className="AddVacation">
            <div className="light-bg"></div>
            <h2> Add a Flight</h2>
            <form onSubmit={handleSubmit(send, onError)}>
                <div className="input-div">
                    <input placeholder="Destination"
                        {...register("destination", {
                            required: "Destination is required",
                            minLength: {
                                value: 2,
                                message: "Destination must be at least 2 characters long",
                            },
                        })}
                        className={classNames(`my-custom-date-input`, { 'invalid-input': errors?.destination })}
                        onChange={(e) => setValue("destination", e.target.value)}
                    />
                    {errors?.destination && <div className="error-message">
                        <span >{errors.destination?.message}</span>
                        <div className="red-chupchik"><img src={redChupchik} alt="red-chupchik" /></div>
                    </div>}
                </div>
                <div className="dates-inputs">
                    <div className="input-div">
                        <input type="date"
                            {...register("startDate", {
                                required: "Start Date is required",
                            })}
                            className={classNames(`my-custom-date-input`, { 'invalid-input': errors?.startDate })}
                            onChange={(e) => setValue("startDate", e.target.value)}
                        />
                        {errors?.startDate && <div className="error-message">
                            <span >{errors.startDate?.message}</span>
                            <div className="red-chupchik"><img src={redChupchik} alt="red-chupchik" /></div>
                        </div>}
                    </div>
                    <span>-</span>
                    <div className="input-div">
                        <input type="date"
                            {...register("endDate", {
                                required: "End Date is required",
                            })}
                            className={classNames(`my-custom-date-input`, { 'invalid-input': errors?.endDate })}
                            onChange={(e) => setValue("endDate", e.target.value)}
                        />
                        {errors?.endDate && <div className="error-message">
                            <span >{errors.endDate?.message}</span>
                            <div className="red-chupchik"><img src={redChupchik} alt="red-chupchik" /></div>
                        </div>}
                    </div>
                </div>
                <div className="input-div">
                    <input type="number"
                        placeholder="Price ($)"
                        step="0.1"
                        {...register("price", {
                            required: "Price is required",
                            min: {
                                value: 0,
                                message: "Price must be higher than 0",
                            },
                            max: {
                                value: 10000,
                                message: "Price can't be higher than 10,000",
                            },
                        })}
                        className={classNames({ 'invalid-input': errors?.price })}
                        onChange={(e) => setValue("price", +e.target.value)}
                    />
                    {errors?.price && <div className="error-message">
                        <span >{errors.price?.message}</span>
                        <div className="red-chupchik"><img src={redChupchik} alt="red-chupchik" /></div>
                    </div>}
                </div>
                <div className="input-div">
                    <textarea placeholder="Description"
                        cols={30} rows={10}
                        {...register("description", {
                            required: "Description is required",
                            minLength: {
                                value: 2,
                                message: "Description must be at least 2 characters long",
                            },
                            maxLength: {
                                value: 500,
                                message: "Description can't be over 250 characters long",
                            },
                        })}
                        className={classNames(`my-custom-date-input`, { 'invalid-input': errors?.description })}
                        onChange={(e) => setValue("description", e.target.value)}
                    />
                    {errors?.description && <div className="error-message">
                        <span >{errors.description?.message}</span>
                        <div className="red-chupchik"><img src={redChupchik} alt="red-chupchik" /></div>
                    </div>}
                </div>
                <div className="input-div">
                    <div className="image-upload">
                        <label>Image:</label>
                        <div className="image-thumbnail">
                            <input type="file"
                                accept="image/*"
                                {...register("image", {
                                    required: "Image is required",
                                })}
                                className={classNames("upload-input", { 'invalid-input': errors?.description })}
                                onChange={handleFileChange}
                            />
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
                    {errors?.image && <div className="error-message">
                        <span >{errors.image?.message}</span>
                        <div className="red-chupchik"><img src={redChupchik} alt="red-chupchik" /></div>
                    </div>}
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