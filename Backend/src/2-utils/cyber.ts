import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Forbidden, Unauthorized } from "../3-models/error-models";
import RoleModel from "../3-models/role-model";
import UserModel from "../3-models/user-model";

class Cyber {

    private secretKey = "Like-A-Flight-Secret-Key";

    public getNewToken(user: UserModel): string {

        // Never return passwords to frontend:
        delete user.password;

        // Containing the user inside a container object: 
        const container = { user };

        // Create expiration date: 
        const options = { expiresIn: "8h" };

        // Create token: 
        const token = jwt.sign(container, this.secretKey, options);

        // Return the token: 
        return token;
    }

    // Verify token validity:
    public verifyToken(token: string): void {

        // If no token:
        if (!token) throw new Unauthorized("You are not logged in.");

        try {
            jwt.verify(token, this.secretKey);
        }
        catch (err: any) {
            console.log(err.message)
            throw new Unauthorized(err.message);
        }
    }

    // Verify admin role: 
    public verifyAdmin(token: string): void {

        // Verify token: 
        this.verifyToken(token);

        // Get the container containing the user object: 
        const container = jwt.verify(token, this.secretKey) as { user: UserModel };

        // Extract the user from the container: 
        const user = container.user;

        // If user is not an admin: 
        if (user.roleId !== RoleModel.Admin) throw new Forbidden("You are not admin.");
    }

    // Hash password:
    public hashPassword(plainText: string): string {
        if (!plainText) return null;

        // Create hash with salt: 
        const salt = "HimalayanPinkSalt";
        const hashedPassword = crypto.createHmac("sha512", salt).update(plainText).digest("hex"); // hex = convert to string.
        return hashedPassword;
    }
}

const cyber = new Cyber();
export default cyber;