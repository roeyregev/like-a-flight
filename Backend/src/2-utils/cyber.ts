import { Forbidden, Unauthorized } from "../3-models/error-models";
import RoleModel from "../3-models/role-model";
import UserModel from "../3-models/user-model";
import jwt from "jsonwebtoken";

class Cyber {

    private secretKey = "Like-A-Flight-Secret-Key";

    public getNewToken(user: UserModel): string {

        // Containing the user inside a container object: 
        const container = { user };

        // Create expiration date: 
        const options = { expiresIn: "8h" };

        // Create token: 
        const token = jwt.sign(container, this.secretKey, options);

        // Return the token: 
        return token;
    }

    // // Verify token validity:
    // public verifyToken(token: string): void {

    //     // If no token:
    //     if (!token) throw new Unauthorized("You are not logged in.");

    //     try {
    //         jwt.verify(token, this.secretKey);
    //     }
    //     catch (err: any) {
    //         throw new Unauthorized(err.message);
    //     }
    // }

    // Verify admin role: 
    // public verifyAdmin(token: string): void {

    //     // Verify token: 
    //     this.verifyToken(token);

    //     // Get the container containing the user object: 
    //     const container = jwt.verify(token, this.secretKey) as { user: UserModel };

    //     // Extract the user from the container: 
    //     const user = container.user;

    //     // If user is not an admin: 
    //     if(user.roleId !== RoleModel.Admin) throw new Forbidden("You are not admin.");
    // }

}

const cyber = new Cyber();

export default cyber;
