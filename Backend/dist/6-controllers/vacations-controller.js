var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { fileSaver } from "uploaded-file-saver";
import StatusCode from "../3-models/status-codes";
import VacationModel from "../3-models/vacation-model";
import verifyAdmin from "../4-middleware/verify-admin";
import verifyToken from "../4-middleware/verify-token";
import vacationsService from "../5-services/vacations-service";
const router = express.Router();
//GET all vacations
router.get("/vacations/user/:userId", verifyToken, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +request.params.userId;
        const vacations = yield vacationsService.getAllVacations(userId);
        response.json(vacations);
    }
    catch (err) {
        next(err);
    }
}));
//POST like a vacations
router.post("/vacations/:vacationId/:userId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacationId = +request.params.vacationId;
        const userId = +request.params.userId;
        yield vacationsService.likeVacation(userId, vacationId);
        response.status(StatusCode.Created).sendStatus(StatusCode.Created);
    }
    catch (err) {
        next(err);
    }
}));
//DELETE - unlike a vacations
router.delete("/vacations/:vacationId/:userId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacationId = +request.params.vacationId;
        const userId = +request.params.userId;
        yield vacationsService.unLikeVacation(userId, vacationId);
        response.status(StatusCode.NoContent).sendStatus(StatusCode.NoContent);
    }
    catch (err) {
        next(err);
    }
}));
//GET one vacation
router.get("/vacations/:vacationId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = yield vacationsService.getOneVacation(vacationId);
        response.json(vacation);
    }
    catch (err) {
        next(err);
    }
}));
//POST vacation
router.post("/vacations", verifyAdmin, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //set uploaded image:
        request.body.image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
        //create & add vacation sequence
        const vacation = new VacationModel(request.body);
        const addedVacation = yield vacationsService.addVacation(vacation);
        response.status(StatusCode.Created).json(addedVacation);
    }
    catch (err) {
        next(err);
    }
}));
// Getting the image >> GET http://localhost:4000/api/vacations/images/:imageName
router.get("/vacations/images/:imageName", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageName = request.params.imageName;
        const absolutePath = fileSaver.getFilePath(imageName); //__dirName > current directory
        response.sendFile(absolutePath);
    }
    catch (err) {
        next(err);
    }
}));
// PUT http://localhost:4000/api/vacations/:vacationId
router.put("/vacations/:vacationId", verifyAdmin, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const vacationId = +request.params.vacationId;
        request.body.vacationId = vacationId;
        request.body.image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
        const vacation = new VacationModel(request.body);
        const updatedVacation = yield vacationsService.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err) {
        next(err);
    }
}));
router.delete("/vacations/:vacationId", verifyAdmin, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vacationId = +request.params.vacationId;
        yield vacationsService.deleteVacation(vacationId);
        console.log(`vacation #${vacationId} was deleted`);
        response.status(StatusCode.NoContent).sendStatus(StatusCode.NoContent);
    }
    catch (err) {
        next(err);
    }
}));
router.get("/analytics", verifyAdmin, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chartData = yield vacationsService.getChartData();
        response.json(chartData);
    }
    catch (err) {
        next(err);
    }
}));
export default router;
