import { OkPacket } from "mysql";
import { fileSaver } from "uploaded-file-saver";
import appConfig from "../2-utils/app-config";
import dal from "../2-utils/dal";
import ChartDataModel from "../3-models/chart-data-model";
import { ResourceNotFound } from "../3-models/error-models";
import VacationModel from "../3-models/vacation-model";

class VacationsService {

    public async getAllVacations(userId: number): Promise<VacationModel[]> {
        const sql = `
                SELECT DISTINCT
                V.vacationId, destination, description, startDate, endDate, price, CONCAT('${appConfig.appHost}', '/api/vacations/images/', ImageName) AS imageUrl,
                EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
                COUNT(F.userId) AS likes
                FROM vacations as V LEFT JOIN followers as F
                ON V.vacationId = F.vacationId
                GROUP BY vacationId
                ORDER BY startDate
                `
        const vacations = await dal.execute(sql, [userId]);
        return vacations;
    }

    //GET one vacation
    public async getOneVacation(vacationId: number): Promise<VacationModel> {

        const sql = `SELECT vacationId, destination, description, startDate, endDate, price, CONCAT('${appConfig.appHost}', '/api/vacations/images/', ImageName) AS imageUrl FROM vacations WHERE vacationId = ?`;
        const vacation = await dal.execute(sql, [vacationId]);

        // If id not found: 
        if (!vacation) throw new ResourceNotFound(vacationId);

        return vacation;
    }

    //POST vacation:
    public async addVacation(vacation: VacationModel): Promise<VacationModel> {

        // Validate: 
        vacation.postValidate();

        // save image to disk:
        const imageName = await fileSaver.add(vacation.image);

        //execute sql query & adding ID
        const sql = "INSERT INTO vacations VALUES(DEFAULT,?,?,?,?,?,?)";
        const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, `${imageName}`]);
        vacation.vacationId = info.insertId

        //delete image from model:
        delete vacation.image;

        //return added product:
        return vacation;
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {

        //validate
        vacation.putValidate();

        //Get existing imageName
        const existingImageName = await this.getExistingImageName(vacation.vacationId);

        //update image name if exists and GET new or existing image name:
        const imageName = vacation.image ? await fileSaver.update(existingImageName, vacation.image) : existingImageName;

        //sql update query & execution
        const sql = "UPDATE vacations SET destination = ?, description = ?, startDate = ?, endDate = ?, price = ?, imageName = ? WHERE vacationId = ?";
        const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, imageName, vacation.vacationId]);

        //if no such vacationId:
        if (info.affectedRows === 0) throw new ResourceNotFound(vacation.vacationId);

        //delete image from model:
        delete vacation.image;

        //update imageUrl:
        vacation.imageUrl = appConfig.appHost + "/api/vacations/images/" + imageName;

        return vacation;
    }

    public async deleteVacation(vacationId: number): Promise<void> {

        //Get existing imageName
        const existingImageName = await this.getExistingImageName(vacationId);

        //sql delete query & execution
        const sql = `DELETE FROM vacations WHERE vacationId ='${vacationId}'`;
        const info: OkPacket = await dal.execute(sql);

        //delete image from disk
        await fileSaver.delete(existingImageName);

        //fi vacationId not found:
        if (info.affectedRows === 0) throw new ResourceNotFound(vacationId);
    }

    //Get image name by ID  >>> (to use for deleting image from disk):
    private async getExistingImageName(vacationId: number): Promise<string> {
        const sql = `SELECT imageName FROM vacations WHERE vacationId = ${vacationId}`;
        const vacations = await dal.execute(sql);
        const vacation = vacations[0];
        return vacation.imageName;;
    }

    public async likeVacation(userId: number, vacationId: number): Promise<void> {
        const sql = `INSERT INTO followers VALUES(?,?)`
        await dal.execute(sql, [userId, vacationId])
    }

    public async unLikeVacation(userId: number, vacationId: number): Promise<void> {
        const sql = `DELETE FROM followers WHERE userId=? AND vacationId=?`
        await dal.execute(sql, [userId, vacationId])
    }

    public async getChartData(): Promise<ChartDataModel[]> {
        const sql = `SELECT COUNT(followers.vacationId) AS count, vacations.destination, vacations.vacationId FROM followers  JOIN vacations ON followers.vacationId = vacations.vacationId GROUP BY followers.vacationId`;
        const chartData = await dal.execute(sql);
        return chartData;
    }
}

const vacationsService = new VacationsService();
export default vacationsService;