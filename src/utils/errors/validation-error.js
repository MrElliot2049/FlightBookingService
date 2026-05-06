const {StatusCodes} = require('http-status-codes');

class ValidationError extends Error {
    constructor(error){
        super();
        let explanation = [];
        error.errors.forEach((e) => {
            explanation.push(e);
        });
        this.name = 'ValidationError';
        this.message = 'Not able to validate date bring sent in a request';
        this.explanation = explanation;
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}
module.exports = ValidationError;