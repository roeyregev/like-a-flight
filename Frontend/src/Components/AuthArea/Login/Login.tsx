import classNames from "classnames";
import ReactDOM from "react-dom";
import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import mediumCloseIcon from "../../../Assets/Images/close-icon-medium.svg";
import redChupchik from "../../../Assets/Images/redChupchick.svg";
import CredentialsModel from "../../../Models/credentials-model";
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

    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<UserModel>()
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notificationService.success("You are now logged in");
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
                <h2>Log In</h2>
                <button type="button" className="close-btn" onClick={props.onClose}><img src={mediumCloseIcon} alt="close-btn" /></button>
                <div className="input-flex">
                    <div className="input-div">
                        <input type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className={classNames({ 'invalid-input': errors?.email })}
                            onChange={(e) => setValue("email", e.target.value)}
                            // testing enter key as submit
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault(); // Prevent accidental form submission if inputs trigger it
                                    handleSubmit(send, onError)();
                                }
                            }}
                        />
                        {errors?.email && <div className="error-message">
                            <span >{errors.email?.message}</span>
                            <div className="red-chupchik"><img src={redChupchik} alt="red-chupchik" /></div>
                        </div>}
                    </div>
                    <div className="input-div">
                        <input type="password"
                            placeholder="password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            className={classNames({ 'invalid-input': errors?.password })}
                            onChange={(e) => setValue("password", e.target.value)}
                        />
                        {errors?.password && <div className="error-message">
                            <span >{errors.password?.message}</span>
                            <div className="red-chupchik"><img src={redChupchik} alt="red-chupchik" /></div>
                        </div>}
                    </div>
                </div>
                <button className="main-btn" type="submit">Enter</button>
                <div className="login-footer">
                    <p>Not a Member?</p>
                    <button type="button" className="footer-btn" onClick={props.switchToRegister}>Register now</button>
                </div>

            </form>
        </>,
        document.getElementById("portal")
    );
}

export default Login;