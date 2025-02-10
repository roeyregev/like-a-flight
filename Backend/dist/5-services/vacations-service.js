var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fileSaver } from "uploaded-file-saver";
import appConfig from "../2-utils/app-config";
import dal from "../2-utils/dal";
import { ResourceNotFound } from "../3-models/error-models";
class VacationsService {
    getAllVacations(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
                SELECT DISTINCT
                V.vacationId, destination, description, startDate, endDate, price, CONCAT('${appConfig.appHost}', '/api/vacations/images/', ImageName) AS imageUrl,
                EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
                COUNT(F.userId) AS likes
                FROM vacations as V LEFT JOIN followers as F
                ON V.vacationId = F.vacationId
                GROUP BY vacationId
                ORDER BY startDate
                `;
            const vacations = yield dal.execute(sql, [userId]);
            return vacations;
        });
    }
    //GET one vacation
    getOneVacation(vacationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT vacationId, destination, description, startDate, endDate, price, CONCAT('${appConfig.appHost}', '/api/vacations/images/', ImageName) AS imageUrl FROM vacations WHERE vacationId = ?`;
            const vacation = yield dal.execute(sql, [vacationId]);
            // If id not found: 
            if (!vacation)
                throw new ResourceNotFound(vacationId);
            return vacation;
        });
    }
    //POST vacation:
    addVacation(vacation) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate: 
            vacation.postValidate();
            // save image to disk:
            const imageName = yield fileSaver.add(vacation.image);
            //execute sql query & adding ID
            const sql = "INSERT INTO vacations VALUES(DEFAULT,?,?,?,?,?,?)";
            //mysql2
            const info = yield dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, `${imageName}`]);
            //mysql (old)
            // const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, `${imageName}`]);
            vacation.vacationId = info.insertId;
            //delete image from model:
            delete vacation.image;
            //return added product:
            return vacation;
        });
    }
    updateVacation(vacation) {
        return __awaiter(this, void 0, void 0, function* () {
            //validate
            vacation.putValidate();
            //Get existing imageName
            const existingImageName = yield this.getExistingImageName(vacation.vacationId);
            //update image name if exists and GET new or existing image name:
            const imageName = vacation.image ? yield fileSaver.update(existingImageName, vacation.image) : existingImageName;
            //sql update query & execution
            const sql = "UPDATE vacations SET destination = ?, description = ?, startDate = ?, endDate = ?, price = ?, imageName = ? WHERE vacationId = ?";
            //mysql2
            const info = yield dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, imageName, vacation.vacationId]);
            //mysql (old)
            // const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, imageName, vacation.vacationId]);
            //if no such vacationId:
            if (info.affectedRows === 0)
                throw new ResourceNotFound(vacation.vacationId);
            //delete image from model:
            delete vacation.image;
            //update imageUrl:
            vacation.imageUrl = appConfig.appHost + "/api/vacations/images/" + imageName;
            return vacation;
        });
    }
    deleteVacation(vacationId) {
        return __awaiter(this, void 0, void 0, function* () {
            //Get existing imageName
            const existingImageName = yield this.getExistingImageName(vacationId);
            //sql delete query & execution
            const sql = `DELETE FROM vacations WHERE vacationId ='${vacationId}'`;
            //mysql2
            const info = yield dal.execute(sql, [vacationId]);
            //mysql (old)
            // const info: OkPacket = await dal.execute(sql);
            //delete image from disk
            yield fileSaver.delete(existingImageName);
            //fi vacationId not found:
            if (info.affectedRows === 0)
                throw new ResourceNotFound(vacationId);
        });
    }
    //Get image name by ID  >>> (to use for deleting image from disk):
    getExistingImageName(vacationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT imageName FROM vacations WHERE vacationId = ${vacationId}`;
            const vacations = yield dal.execute(sql);
            const vacation = vacations[0];
            return vacation.imageName;
            ;
        });
    }
    likeVacation(userId, vacationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO followers VALUES(?,?)`;
            yield dal.execute(sql, [userId, vacationId]);
        });
    }
    unLikeVacation(userId, vacationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM followers WHERE userId=? AND vacationId=?`;
            yield dal.execute(sql, [userId, vacationId]);
        });
    }
    getChartData() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT COUNT(followers.vacationId) AS count, vacations.destination, vacations.vacationId FROM followers  JOIN vacations ON followers.vacationId = vacations.vacationId GROUP BY followers.vacationId`;
            const chartData = yield dal.execute(sql);
            return chartData;
        });
    }
}
const vacationsService = new VacationsService();
export default vacationsService;
