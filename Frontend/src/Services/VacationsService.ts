import axios from "axios";
import ChartDataModel from "../Models/chart-data-model";
import VacationModel from "../Models/vacation-model";
import appConfig from "../Utils/AppConfig";

interface VacationData {
    count: number;
}

class VacationsService {

    public async getAllVacations(userId: number): Promise<VacationModel[]> {
        const response = await axios.get(appConfig.vacationsUrl + "user/" + userId);
        const vacations = response.data;
        return vacations;
    }

    // public async getNineVacations(pageNumber: number = 1, userId: number): Promise<VacationModel[]> {
    //     const response = await axios.get(appConfig.vacationsUrl + "pages/" + pageNumber + "/" + userId);
    //     const vacations = response.data;
    //     return vacations;
    // }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        const response = await axios.get(appConfig.vacationsUrl + vacationId);
        const vacation = response.data[0];
        return vacation;
    }


    // public async getVacationsData(): Promise<VacationData> {
    //     const response = await axios.get(appConfig.vacationsUrl + "data");
    //     const vacationsData = response.data;
    //     return vacationsData;
    // }


    public async likeVacation(vacationId: number, userId: number): Promise<void> {
        await axios.post(appConfig.vacationsUrl + vacationId + "/" + userId);
    }


    public async unLikeVacation(vacationId: number, userId: number): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + vacationId + "/" + userId);
    }


    public async addVacation(vacation: VacationModel): Promise<void> {
        const options = {
            headers: { "Content-Type": "multipart/form-data" }
        }
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, options);
        const addedVacation = response.data;
    }


    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        const options = {
            headers: { "Content-Type": "multipart/form-data" }
        }
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, vacation, options);
        const updatedVacation = response.data;
        return updatedVacation;
    }


    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete<VacationModel>(appConfig.vacationsUrl + vacationId);
        console.log(`vacation #${vacationId} was deleted`);
    }


    public async getChartData(): Promise<ChartDataModel[]> {
        const response = await axios.get(appConfig.analyticsUrl);
        const chartData = response.data;
        return chartData;
    }

}

const vacationsService = new VacationsService();

export default vacationsService;
