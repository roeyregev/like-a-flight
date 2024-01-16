import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

// Verify token validity Middleware:
function verifyToken(request: Request, response: Response, next: NextFunction): void {

    // Take authorization header: 
    const authorization = request.header("authorization"); // "Bearer the-token"

    // Extract the token: 
    const token = authorization?.substring(7);

    // Verify: 
    cyber.verifyToken(token);

    // All is good:
    next();
}

export default verifyToken;