import StatusCode from "./status-codes";
class BaseError {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}
export class RouteNotFound extends BaseError {
    constructor(route) {
        super(StatusCode.NotFound, `Route ${route} not found.`);
    }
}
export class ResourceNotFound extends BaseError {
    constructor(id) {
        super(StatusCode.NotFound, `id ${id} not found.`);
    }
}
export class Validation extends BaseError {
    constructor(message) {
        super(StatusCode.BadRequest, message);
    }
}
export class Unauthorized extends BaseError {
    constructor(message) {
        super(StatusCode.Unauthorized, message);
    }
}
export class Forbidden extends BaseError {
    constructor(message) {
        super(StatusCode.Forbidden, message);
    }
}
