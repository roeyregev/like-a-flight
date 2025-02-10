import Joi from "joi";
import { Validation } from "./error-models";
class CredentialsModel {
    constructor(credentials) {
        this.email = credentials.email;
        this.password = credentials.password;
    }
    //POST validate current object, throw if not valid:
    postValidate() {
        var _a;
        const result = CredentialsModel.postValidationSchema.validate(this);
        if ((_a = result.error) === null || _a === void 0 ? void 0 : _a.message)
            throw new Validation(result.error.message);
    }
}
//POST validation schema:
CredentialsModel.postValidationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});
export default CredentialsModel;
