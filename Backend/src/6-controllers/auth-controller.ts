import express, { NextFunction, Request, Response } from "express";
import { fileSaver } from "uploaded-file-saver";
import CredentialsModel from "../3-models/credentials-model";
import StatusCode from "../3-models/status-codes";
import UserModel from "../3-models/user-model";
import authService from "../5-services/auth-service";

const router = express.Router();

// POST http://localhost:4000/api/register
router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        //set uploaded image:
        request.body.image = request.files?.image;

        const user = new UserModel(request.body);
        const token = await authService.register(user);
        response.status(StatusCode.Created).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

// Getting the image >>  GET http://localhost:4000/api/register/images/:imageName
router.get("/register/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = fileSaver.getFilePath(imageName) //__dirName > current directory
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:4000/api/users/:userId
router.delete("/register/:userId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        await authService.deleteAccount(userId);
        response.sendStatus(StatusCode.NoContent);
    }
    catch (err: any) {
        next(err);
    }
});



// POST http://localhost:4000/api/login
router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authService.login(credentials);
        response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
