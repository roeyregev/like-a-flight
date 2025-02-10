import cyber from "../2-utils/cyber";
// Verify admin role Middleware:
function verifyAdmin(request, response, next) {
    // Take authorization header: 
    const authorization = request.header("authorization"); // "Bearer the-token"
    // Extract the token: 
    const token = authorization === null || authorization === void 0 ? void 0 : authorization.substring(7);
    // Verify: 
    cyber.verifyAdmin(token);
    // All is good:
    next();
}
export default verifyAdmin;
