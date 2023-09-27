class InternalServerError extends Error {
    #statusCode = 500;

    constructor(message, status) {
        super(message);
        this.#statusCode = status;
    }

    getStatusCode() {
        return this.#statusCode;
    }
}

class InvalidDataError extends InternalServerError {
    constructor(message) {
        super(message, 400);
    }
}

class UnauthorizedError extends InternalServerError {
    constructor(message) {
        super(message, 401);
    }
}

class UnauthenticatedError extends InternalServerError {
    constructor(message) {
        super(message, 403);
    }
}

class ItemNotFoundError extends InternalServerError {
    constructor(message) {
        super(message, 404);
    }
}

class PathNotFoundError extends InternalServerError {
    constructor(message) {
        super(message, 404);
    }
}

class UnavailableServiceError extends InternalServerError {
    constructor(message) {
        super(message, 503);
    }
}

class UnprocessableContentError extends InternalServerError {
    constructor(message) {
        super(message, 422);
    }
}

export {
    InternalServerError,
    InvalidDataError,
    UnauthorizedError,
    UnauthenticatedError,
    ItemNotFoundError,
    PathNotFoundError,
    UnprocessableContentError,
    UnavailableServiceError,
};
