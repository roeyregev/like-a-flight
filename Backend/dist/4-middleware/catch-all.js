import StatusCode from "../3-models/status-codes";
// Catch-all Middleware:
function catchAll(err, request, response, next) {
    // Log error: 
    console.log("Error: ", err.message);
    // Create error status: 
    const status = err.status ? err.status : StatusCode.InternalServerError;
    // Response the error back to the front: 
    response.status(status).send(err.message);
}
export default catchAll;
