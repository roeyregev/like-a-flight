import { getDefaultHighWaterMark } from "stream";
import UserModel from "../3-models/user-model";
import RoleModel from "../3-models/role-model";
import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import CredentialsModel from "../3-models/credentials-model";
import { Unauthorized } from "../3-models/error-models";
import { fileSaver } from "uploaded-file-saver";
import appConfig from "../2-utils/app-config";

class AuthService {

    public async register(user: UserModel): Promise<string> {

        //validate:
        //user.validate()

        //is email taken:
        //if...

        // save image to disk:
        const imageName = await fileSaver.add(user.image);
        //update image url:
        user.userImageUrl = appConfig.appHost + "/api/register/images/" + imageName;

        //Declare user as regular user
        user.roleId = RoleModel.User

        //sql query:
        const sql = `INSERT INTO users VALUES(DEFAULT,?,?,?,?,?,?)`;
        //(firstName, lastName, email, password, roleId, userImageUrl)

        //save user:
        const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.roleId, `${imageName}`]);

        //set user id:
        user.userId = info.insertId;

        //delete image from model:
        delete user.image;

        // //update image url:
        // user.userImageUrl = appConfig.appHost + "/api/register/images/" + imageName;

        //Generate token:
        const token = cyber.getNewToken(user);

        //return token
        return token;
    }


    public async login(credentials: CredentialsModel): Promise<string> {

        // Validate: 
        // user.validate();

        // Create sql:
        const sql = `SELECT * FROM users WHERE
                        email = '${credentials.email}' AND
                        password = '${credentials.password}'`;

        // Execute: 
        const users = await dal.execute(sql);

        // Get single user: 
        const user = users[0];

        // If user not exist:
        if (!user) throw new Unauthorized("Incorrect email or password.");

        // Generate token: 
        const token = cyber.getNewToken(user);

        // Return token:
        return token;
    }



}

const authService = new AuthService();
export default authService