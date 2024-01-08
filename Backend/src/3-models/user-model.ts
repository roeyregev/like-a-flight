import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { Validation } from "./error-models";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: number;
    public userImageUrl: string;
    // public image: UploadedFile;


    constructor(user: UserModel) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
        this.userImageUrl = user.userImageUrl;
        // this.userImageUrl = user.userImageUrl;
    }

    // //POST validation schema:
    // private static postValidationSchema = Joi.object({
    //     userId: Joi.number().positive().forbidden(),
    //     firstName: Joi.string().required().min(2).max(20),
    //     lastName: Joi.string().required().min(2).max(20),
    //     email: Joi.string().required().min(2).max(40),
    //     password: Joi.string().required().min(2).max(50),
    //     roleId: Joi.number().required().positive(),
    //     userImageUrl: Joi.string().optional().min(40).max(300),
    //     image: Joi.object().required(),

    // })

    // //PUT validation schema:
    // private static putValidationSchema = Joi.object({
    //     userId: Joi.number().positive().forbidden(),
    //     firstName: Joi.string().required().min(2).max(20),
    //     lastName: Joi.string().required().min(2).max(20),
    //     email: Joi.string().required().min(2).max(40),
    //     password: Joi.string().required().min(2).max(50),
    //     roleId: Joi.number().required().positive(),
    //     userImageUrl: Joi.string().optional().min(40).max(300),
    //     image: Joi.object().optional(),

    // })

    // //POST validate current object, throw if not valid:
    // public postValidate(): void {
    //     const result = UserModel.postValidationSchema.validate(this);
    //     if (result.error?.message) throw new Validation(result.error.message)
    // }

    // //PUT validate current object, throw if not valid:
    // public putValidate(): void {
    //     const result = UserModel.putValidationSchema.validate(this);
    //     if (result.error?.message) throw new Validation(result.error.message)
    // }
}

export default UserModel