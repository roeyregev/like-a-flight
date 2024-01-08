import axios from "axios";
import VacationModel from "../Models/vacation-model";
import appConfig from "../Utils/AppConfig";

interface VacationData {
    count: number;
}

class VacationsService {

    public async getAllVacations(): Promise<VacationModel[]> {
        const response = await axios.get(appConfig.vacationsUrl);
        const vacations = response.data;
        return vacations;
    }

    public async getNineVacations(pageNumber: number = 1, userId: number): Promise<VacationModel[]> {
        // console.log(appConfig.vacationsUrl + "pages/" + pageNumber + "/" + userId)
        const response = await axios.get(appConfig.vacationsUrl + "pages/" + pageNumber + "/" + userId);
        const vacations = response.data;
        return vacations;
    }

    // public async getNineVacations(pageNumber: number = 1): Promise<VacationModel[]> {
    //     const response = await axios.get(appConfig.vacationsUrl + "pages/" + pageNumber);
    //     const vacations = response.data;
    //     return vacations;
    // }


    public async getVacationsData(): Promise<VacationData> {
        const response = await axios.get(appConfig.vacationsUrl + "data");
        const vacationsData = response.data;
        return vacationsData;
    }
}

const vacationsService = new VacationsService();

export default vacationsService;
