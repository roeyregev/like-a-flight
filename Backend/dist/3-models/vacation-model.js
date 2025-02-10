import Joi from "joi";
import { Validation } from "./error-models";
class VacationModel {
    constructor(vacation) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageUrl = vacation.imageUrl;
        this.image = vacation.image;
        this.likes = vacation.likes;
        this.isFollowing = vacation.isFollowing;
    }
    //POST validate current object, throw if not valid:
    postValidate() {
        var _a;
        const result = VacationModel.postValidationSchema.validate(this);
        if ((_a = result.error) === null || _a === void 0 ? void 0 : _a.message)
            throw new Validation(result.error.message);
    }
    //PUT validate current object, throw if not valid:
    putValidate() {
        var _a;
        const result = VacationModel.putValidationSchema.validate(this);
        if ((_a = result.error) === null || _a === void 0 ? void 0 : _a.message)
            throw new Validation(result.error.message);
    }
}
//POST validation schema:
VacationModel.postValidationSchema = Joi.object({
    vacationId: Joi.number().forbidden(),
    destination: Joi.string().required().min(2).max(500),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().required().min(0).max(10000),
    description: Joi.string().required().min(2).max(500),
    imageUrl: Joi.string().optional(),
    image: Joi.object().required(),
    likes: Joi.number().forbidden(),
    isFollowing: Joi.number().forbidden()
});
//PUT validation schema:
VacationModel.putValidationSchema = Joi.object({
    vacationId: Joi.number().required().integer().positive(),
    destination: Joi.string().required().min(2).max(500),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().required().min(0).max(10000),
    description: Joi.string().required().min(2).max(500),
    imageUrl: Joi.string().optional(),
    image: Joi.object().optional(),
    likes: Joi.number().forbidden(),
    isFollowing: Joi.number().forbidden()
});
export default VacationModel;
