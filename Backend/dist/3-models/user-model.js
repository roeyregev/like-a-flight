import Joi from "joi";
class UserModel {
    constructor(user) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
        this.userImageUrl = user.userImageUrl;
        this.image = user.image;
    }
    //POST validate current object, throw if not valid:
    postValidate() {
        var _a;
        const result = UserModel.postValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    }
}
//POST validation schema:
UserModel.postValidationSchema = Joi.object({
    userId: Joi.number().positive().forbidden(),
    firstName: Joi.string().required().min(2).max(20),
    lastName: Joi.string().required().min(2).max(20),
    email: Joi.string().required().min(2).max(40),
    password: Joi.string().required().min(4).max(200),
    roleId: Joi.number().forbidden().positive(),
    userImageUrl: Joi.string().optional().min(40).max(300),
    image: Joi.object().optional(),
});
export default UserModel;
