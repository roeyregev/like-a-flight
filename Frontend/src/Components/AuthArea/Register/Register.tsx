import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import appConfig from "../../../Utils/AppConfig";
import "./Register.css";

type RegisterProps = {
    open: boolean
    onClose: any
    switchToLogin: any
}

function Register(props: RegisterProps): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>()
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
           await authService.register(user);
            // console.log(token);
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
            <div className="background"></div>
            <form className="Register" onSubmit={handleSubmit(send)}>

                <h2>Register</h2>
                <button className="close-btn" onClick={props.onClose}>X</button>

                <div className="input-flex">
                    <input type="text" placeholder="First Name" {...register("firstName")} />
                    <input type="text" placeholder="Last Name" {...register("lastName")} />
                    <input type="email" placeholder="Email" {...register("email")} />
                    <input type="text" placeholder="Image" {...register("userImageUrl")} />
                    <input type="password" placeholder="password" {...register("password")} />
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
