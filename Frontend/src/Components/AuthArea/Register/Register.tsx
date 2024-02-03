import classNames from "classnames";
import { useState } from "react";
import ReactDOM from "react-dom";
import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import buttonPlusIconWhite from "../../../Assets/Images/change-photo-plus-icon-.svg";
import mediumCloseIcon from "../../../Assets/Images/close-icon-medium.svg";
import UserModel from "../../../Models/user-model";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import appConfig from "../../../Utils/AppConfig";
import useImagePreview from "../../../Utils/UseImagePreview";
import "./Register.css";


type RegisterProps = {
    open: boolean
    onClose: any
    switchToLogin: any
}

function Register(props: RegisterProps): JSX.Element {

    const { register, handleSubmit, formState: { errors }, getValues, setValue, control } = useForm<UserModel>()
    const [imageFile, setImageFile] = useState<File | null>();
    const navigate = useNavigate();
    const imageSrc = useImagePreview(imageFile);

    function handleFileChange(event: any) {
        const files = event.target.files;
        if (!files || !files.item(0)) return;
        setImageFile(files.item(0));
    }

    async function send(user: UserModel) {
        try {
            //check email address pattern:
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(user.email)) {
                setValue("email", "");
                throw new Error("Not a valid email address")
            }

            //extract and assign image file to vacation object:
            user.image = (user.image as unknown as FileList)[0];

            await authService.register(user);
            notificationService.success("You have been register successfully");
            navigate(appConfig.vacationsRoute);
            props.onClose();
        }
        catch (err: any) {
            notificationService.error(err)
        }
    }

    const onError = (errors: FieldErrors<UserModel>) => {
        console.log("Form errors: ", errors)
    }

    if (!props.open) return null

    return ReactDOM.createPortal(
        <>
            <div className="background-black"></div>
            <form className="Register" onSubmit={handleSubmit(send, onError)}>

                <h2>Register</h2>
                <button className="close-btn" onClick={props.onClose}><img src={mediumCloseIcon} alt="close-btn" /></button>

                <div className="input-flex">
                    <div className="image-upload">
                        <div className="image-thumbnail">
                            <input type="file" accept="image/*"  {...register("image")} onChange={handleFileChange} required className="upload-input" />
                            {!imageSrc ?
                                <div className="tn-preview">
                                    <button>Add your photo</button>
                                </div> :
                                <div className="tn-preview">
                                    <img src={imageSrc} alt="" className="img-preview" />
                                    <button className="change-btn"><img src={buttonPlusIconWhite} alt="button-plus-icon" />Change</button>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="input-div">
                        <input type="text"
                            placeholder={errors.firstName ? `${errors.firstName.message}` : "First Name"}
                            {...register("firstName", {
                                required: "First name is required",
                                minLength: {
                                    value: 2,
                                    message: "First name must be at least 2 characters long",
                                },
                            })}
                            className={classNames({ 'invalid-input': errors?.firstName })}
                            onChange={(e) => setValue("firstName", e.target.value)}
                        />
                            {errors?.firstName && <span className="error-message">{errors.firstName.message}</span>}
                    </div>

                    <input type="text"
                        placeholder={errors.lastName ? errors.lastName.message : "Last Name"}
                        {...register("lastName", {
                            required: "Last name name is required",
                            minLength: {
                                value: 2,
                                message: "Last name must be at least 2 characters long",
                            },
                        })}
                        className={classNames({ 'invalid-input': errors?.lastName })}
                    />

                    <input type="text"
                        placeholder={errors.email ? errors.email.message : "Email"}
                        {...register("email", {
                            required: "Email is required",
                        })}
                        className={classNames({ 'invalid-input': errors?.email })}
                        value={errors?.email ? "" : undefined} // Clear value if there's an error
                    />

                    <input type="password"

                        placeholder={errors.password ? errors.password.message : "Password"}
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 4,
                                message: "Password must be at least 4 characters long",
                            },
                        })}
                        className={classNames({ 'invalid-input': errors?.password })}
                    />

                </div>

                <button className="main-btn">Enter</button>

                <div className="login-footer">
                    <p>Already a Member?</p>
                    <button className="footer-btn" onClick={props.switchToLogin}>Login</button>
                </div>

            </form>
        </>,

        document.getElementById("portal")

    );
}

export default Register;
