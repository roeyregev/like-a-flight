import Joi from "joi";
import { Validation } from "./error-models";

class CredentialsModel {
    public email: string;
    public password: string;

    constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password
    }

    //POST validation schema:
    private static postValidationSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()

    })

    //POST validate current object, throw if not valid:
    public postValidate(): void {
        const result = CredentialsModel.postValidationSchema.validate(this);
        if (result.error?.message) throw new Validation(result.error.message)
    }
}

export default CredentialsModel
