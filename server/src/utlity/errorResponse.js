
class ErrorHandling extends Error{

    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);   
    }
}

export default ErrorHandling;


// constructor(status, message, error) {
//     this.status = status;
//     this.message = message;
//     this.error = error;
// }

// sendError(res) {
//     return res.status(this.status).json({
//         message: this.message,
//         error: this.error
//     });
// }