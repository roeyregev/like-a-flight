import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import appConfig from "./2-utils/app-config";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/route-not-found";
import authController from "./6-controllers/auth-controller";
import vacationController from "./6-controllers/vacations-controller";

// Creating the server: 
const server = express();

// Allow CORS access: 
server.use(cors());

function setCorsHeaders(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
}

server.use(setCorsHeaders)

//set the images folder for the file-saver library
fileSaver.config(path.join(__dirname, "1-assets", "images"));

// Creating a request.body object containing the request body data:
server.use(express.json());

//create request.files object containing the files sent by frontend:
server.use(expressFileUpload());

// Connect our controllers: 
server.use("/api", vacationController);
server.use("/api", authController);

// Route not found: 
server.use(routeNotFound);

// Catch all middleware: 
server.use(catchAll);

// Running the server: 
server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));