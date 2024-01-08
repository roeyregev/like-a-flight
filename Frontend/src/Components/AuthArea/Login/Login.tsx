import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import appConfig from "../../../Utils/AppConfig";
import "./Login.css";

type LoginProps = {
    open: boolean
    onClose: any
    switchToRegister: any
}


function Login(props: LoginProps): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>()
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            const token = await authService.login(user);
            notificationService.success("You are now logged in");
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

                <h2>Log In</h2>
                <button className="close-btn" onClick={props.onClose}>X</button>

                <div className="input-flex">
                    <input type="email" placeholder="Email" {...register("email")} />
                    <input type="password" placeholder="password" {...register("password")} />
                </div>

                <button className="main-btn">Enter</button>

                <div className="login-footer">
                    <p>Not a Member?</p>
                    <button className="footer-btn" onClick={props.switchToRegister}>Register now</button>
                </div>

            </form>
        </>,

        document.getElementById("portal")

    );
}

export default Login;
