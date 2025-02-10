import { RouteNotFound } from "../3-models/error-models";
// Route not found Middleware:
function routeNotFound(request, response, next) {
    // Create not found error: 
    const err = new RouteNotFound(request.originalUrl);
    // Send to catch-all: 
    next(err);
}
export default routeNotFound;
