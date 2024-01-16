import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: number;
    public userImageUrl: string;
    public image: UploadedFile;

    constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
        this.userImageUrl = user.userImageUrl;
        this.image = user.image;
    }

    //POST validation schema:
    private static postValidationSchema = Joi.object({
        userId: Joi.number().positive().forbidden(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        email: Joi.string().required().min(2).max(40),
        password: Joi.string().required().min(2).max(50),
        roleId: Joi.number().forbidden().positive(),
        userImageUrl: Joi.string().optional().min(40).max(300),
        image: Joi.object().required(),
    })

    //POST validate current object, throw if not valid:
    public postValidate(): string {
        const result = UserModel.postValidationSchema.validate(this);
        return result.error?.message;
    }

}

export default UserModel