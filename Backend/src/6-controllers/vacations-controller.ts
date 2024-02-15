import express, { NextFunction, Request, Response } from "express";
import { fileSaver } from "uploaded-file-saver";
import StatusCode from "../3-models/status-codes";
import VacationModel from "../3-models/vacation-model";
import verifyAdmin from "../4-middleware/verify-admin";
import verifyToken from "../4-middleware/verify-token";
import vacationsService from "../5-services/vacations-service";

const router = express.Router();

//GET all vacations
router.get("/vacations/user/:userId", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const vacations = await vacationsService.getAllVacations(userId);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

//POST like a vacations
router.post("/vacations/:vacationId/:userId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const userId = +request.params.userId;
        await vacationsService.likeVacation(userId, vacationId);
        response.status(StatusCode.Created).sendStatus(StatusCode.Created);
    }
    catch (err: any) {
        next(err);
    }
});

//DELETE - unlike a vacations
router.delete("/vacations/:vacationId/:userId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const userId = +request.params.userId;
        await vacationsService.unLikeVacation(userId, vacationId);
        response.status(StatusCode.NoContent).sendStatus(StatusCode.NoContent);
    }
    catch (err: any) {
        next(err);
    }
});

//GET one vacation
router.get("/vacations/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = await vacationsService.getOneVacation(vacationId);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

//POST vacation
router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        //set uploaded image:
        request.body.image = request.files?.image;

        //create & add vacation sequence
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationsService.addVacation(vacation);
        response.status(StatusCode.Created).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// Getting the image >> GET http://localhost:4000/api/vacations/images/:imageName
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = fileSaver.getFilePath(imageName) //__dirName > current directory
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:4000/api/vacations/:vacationId
router.put("/vacations/:vacationId", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId
        request.body.vacationId = vacationId;
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationsService.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/vacations/:vacationId", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        await vacationsService.deleteVacation(vacationId);
        console.log(`vacation #${vacationId} was deleted`);
        response.status(StatusCode.NoContent).sendStatus(StatusCode.NoContent);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/analytics", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const chartData = await vacationsService.getChartData();
        response.json(chartData);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;