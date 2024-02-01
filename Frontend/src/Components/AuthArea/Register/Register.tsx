import { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import buttonPlusIcon from "../../../Assets/Images/add-photo-plus-icon.svg";
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

    const { register, handleSubmit } = useForm<UserModel>()
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

    if (!props.open) return null

    return ReactDOM.createPortal(
        <>
            <div className="background-black"></div>
            <form className="Register" onSubmit={handleSubmit(send)}>

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
                    <input type="text" placeholder="First Name" {...register("firstName")} minLength={2} required />
                    <input type="text" placeholder="Last Name" {...register("lastName")} minLength={2} required />
                    <input placeholder="Email" {...register("email")} required />
                    <input type="password" placeholder="password" {...register("password")} minLength={4} required />
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
