import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { Validation } from "./error-models";

class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public imageUrl: string;
    public image: UploadedFile;
    public likes: number;
    public isFollowing: number;

    constructor(vacation: VacationModel) {
        this.vacationId =vacation.vacationId
        this.destination = vacation.destination
        this.description = vacation.description
        this.startDate = vacation.startDate
        this.endDate = vacation.endDate
        this.price = vacation.price
        this.imageUrl = vacation.imageUrl
        this.image = vacation.image
        this.likes=vacation.likes
        this.isFollowing = vacation.isFollowing
    }

    // //POST validation schema:
    // private static postValidationSchema = Joi.object({
    //     vacationId: Joi.number().forbidden(),
    //     destination: Joi.string().required().min(2).max(500),
    //     startDate: Joi.date().required(),
    //     endDate: Joi.date().required(),
    //     price: Joi.number().required().min(0).max(10000),
    //     imageUrl: Joi.string().optional(),
    //     image: Joi.object().required()
    // })

    // //PUT validation schema:
    // private static putValidationSchema = Joi.object({
    //     vacationId: Joi.number().forbidden(),
    //     destination: Joi.string().required().min(2).max(500),
    //     startDate: Joi.date().required(),
    //     endDate: Joi.date().required(),
    //     price: Joi.number().required().min(0).max(10000),
    //     imageUrl: Joi.string().optional(),
    //     image: Joi.object().optional()
    // })

    // //POST validate current object, throw if not valid:
    // public postValidate(): void {
    //     const result = VacationModel.postValidationSchema.validate(this);
    //     if (result.error?.message) throw new Validation(result.error.message)
    // }
  
    // //PUT validate current object, throw if not valid:
    // public putValidate(): void {
    //     const result = VacationModel.putValidationSchema.validate(this);
    //     if (result.error?.message) throw new Validation(result.error.message)
    // }
}

export default VacationModel

