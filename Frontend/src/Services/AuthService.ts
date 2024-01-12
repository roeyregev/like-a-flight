import axios from "axios";
import appConfig from "../Utils/AppConfig";
import UserModel from "../Models/user-model";
import CredentialsModel from "../Models/credentials-model";
import { AuthAction, AuthActionTypes, authStore } from "../Redux/AuthState";

class AuthService {
    public async register(user: UserModel): Promise<void> {

        const options = {
            headers: { "Content-Type": "multipart/form-data" }
        }

        const response = await axios.post(appConfig.registerUrl, user, options);
        const token = response.data;

        const action: AuthAction = { type: AuthActionTypes.Register, payload: token }
        authStore.dispatch(action);
    }


    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post(appConfig.loginUrl, credentials);
        const token = response.data;
        const action: AuthAction = { type: AuthActionTypes.Login, payload: token }
        authStore.dispatch(action);
    }


    public logout(): void {
        const action: AuthAction = { type: AuthActionTypes.Logout };
        authStore.dispatch(action);
    }
}

const authService = new AuthService();

export default authService;