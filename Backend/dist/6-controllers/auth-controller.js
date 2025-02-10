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
import CredentialsModel from "../3-models/credentials-model";
import StatusCode from "../3-models/status-codes";
import UserModel from "../3-models/user-model";
import authService from "../5-services/auth-service";
const router = express.Router();
// POST http://localhost:4000/api/register
router.post("/register", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //set uploaded image:
        request.body.image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
        const user = new UserModel(request.body);
        const token = yield authService.register(user);
        response.status(StatusCode.Created).json(token);
    }
    catch (err) {
        next(err);
    }
}));
// Getting the image >>  GET http://localhost:4000/api/register/images/:imageName
router.get("/register/images/:imageName", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageName = request.params.imageName;
        const absolutePath = fileSaver.getFilePath(imageName); //__dirName > current directory
        response.sendFile(absolutePath);
    }
    catch (err) {
        next(err);
    }
}));
// DELETE http://localhost:4000/api/users/:userId
router.delete("/register/:userId", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +request.params.userId;
        yield authService.deleteAccount(userId);
        response.sendStatus(StatusCode.NoContent);
    }
    catch (err) {
        next(err);
    }
}));
// POST http://localhost:4000/api/login
router.post("/login", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = yield authService.login(credentials);
        response.json(token);
    }
    catch (err) {
        next(err);
    }
}));
export default router;
