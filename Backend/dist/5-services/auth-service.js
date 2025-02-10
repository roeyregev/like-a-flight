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
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import { ResourceNotFound, Unauthorized, Validation } from "../3-models/error-models";
import RoleModel from "../3-models/role-model";
class AuthService {
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            //validate:
            const error = user.postValidate();
            if (error)
                throw new Validation(error);
            //is email taken:
            if (yield this.isEmailTaken(user.email))
                throw new Validation(`Email ${user.email} is already taken`);
            // Hash password: 
            user.password = cyber.hashPassword(user.password);
            let imageName = "";
            //check if user provided image:
            if (user.image) {
                // save image to disk:
                imageName = yield fileSaver.add(user.image);
                //update image url:
                user.userImageUrl = appConfig.appHost + "/api/register/images/" + imageName;
            }
            //Declare user as regular user:
            user.roleId = RoleModel.User;
            //sql query:
            const sql = `INSERT INTO users VALUES(DEFAULT,?,?,?,?,?,?)`;
            //save user old mysql:
            // const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId, `${user.userImageUrl}`]);
            // Save user - mysql2:
            const info = yield dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId, `${user.userImageUrl}`]);
            //set user id:
            user.userId = info.insertId;
            //delete image from model:
            delete user.image;
            //Generate token:
            const token = cyber.getNewToken(user);
            return token;
        });
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate: 
            credentials.postValidate();
            // Hash password to compare the hashes!
            credentials.password = cyber.hashPassword(credentials.password);
            // Create sql:
            const sql = `SELECT * FROM users WHERE
                        email = ? AND
                        password = ?`;
            // Execute: 
            const users = yield dal.execute(sql, [credentials.email, credentials.password]);
            // Get single user: 
            const user = users[0];
            // If user not exist:
            if (!user)
                throw new Unauthorized("Incorrect email or password.");
            // Generate token: 
            const token = cyber.getNewToken(user);
            // Return token:
            return token;
        });
    }
    isEmailTaken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT COUNT(*) AS count FROM users WHERE email = ?`;
            const result = yield dal.execute(sql, [email]);
            const count = result[0].count;
            //return true/false:
            return count > 0;
        });
    }
    deleteAccount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            //Get existing image name
            const existingImageName = yield this.getExistingImageName(userId);
            // Create sql:
            const sql = `DELETE FROM users WHERE userId = ?`;
            // Execute - delete that product in the database - old mysql:
            // const info: OkPacket = await dal.execute(sql, [userId]);
            // Execute - delete that product in the database - mysql2:
            const info = yield dal.execute(sql, [userId]);
            //delete image from disk:
            yield fileSaver.delete(existingImageName);
            // If id not found:
            if (info.affectedRows === 0)
                throw new ResourceNotFound(userId);
        });
    }
    //Get image name by ID  >>> (to use for deleting image from disk):
    getExistingImageName(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT userImageUrl FROM users WHERE userId = ?`;
            const users = yield dal.execute(sql, [userId]);
            const user = users[0];
            const imageName = user.userImageUrl.slice(user.userImageUrl.indexOf("images/") + "images/".length);
            return imageName;
        });
    }
}
const authService = new AuthService();
export default authService;
