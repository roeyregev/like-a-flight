import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

// Verify admin role Middleware:
function verifyAdmin(request: Request, response: Response, next: NextFunction): void {
    console.log("start");
    // Take authorization header: 
    const authorization = request.header("authorization"); // "Bearer the-token"
    console.log(authorization);
    // Extract the token: 
    const token = authorization?.substring(7);

    // Verify: 
    cyber.verifyAdmin(token);

    console.log("end");
    // All is good:
    next();
}

export default verifyAdmin;
