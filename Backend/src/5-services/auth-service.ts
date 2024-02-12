import { OkPacket } from "mysql";
import { fileSaver } from "uploaded-file-saver";
import appConfig from "../2-utils/app-config";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import CredentialsModel from "../3-models/credentials-model";
import { ResourceNotFound, Unauthorized, Validation } from "../3-models/error-models";
import RoleModel from "../3-models/role-model";
import UserModel from "../3-models/user-model";

class AuthService {

    public async register(user: UserModel): Promise<string> {

        //validate:
        const error = user.postValidate()
        if (error) throw new Validation(error);

        //is email taken:
        if (await this.isEmailTaken(user.email)) throw new Validation(`Email ${user.email} is already taken`);

        // Hash password: 
        user.password = cyber.hashPassword(user.password);

        let imageName = "";

        //check if user provided image:
        if (user.image) {
            // save image to disk:
            imageName = await fileSaver.add(user.image);
            //update image url:
            user.userImageUrl = appConfig.appHost + "/api/register/images/" + imageName;
        }

        //Declare user as regular user:
        user.roleId = RoleModel.User

        //sql query:
        const sql = `INSERT INTO users VALUES(DEFAULT,?,?,?,?,?,?)`;

        //save user:
        const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId, `${user.userImageUrl}`]);

        //set user id:
        user.userId = info.insertId;

        //delete image from model:
        delete user.image;

        //Generate token:
        const token = cyber.getNewToken(user);

        return token;
    }


    public async login(credentials: CredentialsModel): Promise<string> {

        // Validate: 
        credentials.postValidate();

        // Hash password to compare the hashes!
        credentials.password = cyber.hashPassword(credentials.password);

        // Create sql:
        const sql = `SELECT * FROM users WHERE
                        email = ? AND
                        password = ?`;
        // Execute: 
        const users = await dal.execute(sql, [credentials.email, credentials.password]);

        // Get single user: 
        const user = users[0];

        // If user not exist:
        if (!user) throw new Unauthorized("Incorrect email or password.");

        // Generate token: 
        const token = cyber.getNewToken(user);

        // Return token:
        return token;
    }


    public async isEmailTaken(email: string): Promise<boolean> {

        const sql = `SELECT COUNT(*) AS count FROM users WHERE email = ?`;
        const result = await dal.execute(sql, [email]);
        const count = result[0].count;

        //return true/false:
        return count > 0;
    }

    public async deleteAccount(userId: number): Promise<void> {

        //Get existing image name
        const existingImageName = await this.getExistingImageName(userId);

        // Create sql:
        const sql = `DELETE FROM users WHERE userId = ?`

        // Execute - delete that product in the database:
        const info: OkPacket = await dal.execute(sql, [userId]);

        //delete image from disk:
        await fileSaver.delete(existingImageName);

        // If id not found:
        if (info.affectedRows === 0) throw new ResourceNotFound(userId);
    }

    //Get image name by ID  >>> (to use for deleting image from disk):
    private async getExistingImageName(userId: number): Promise<string> {
        const sql = `SELECT userImageUrl FROM users WHERE userId = ?`;
        const users = await dal.execute(sql, [userId]);
        const user = users[0];
        const imageName = user.userImageUrl.slice(user.userImageUrl.indexOf("images/") + "images/".length);
        return imageName;
    }
}

const authService = new AuthService();
export default authService