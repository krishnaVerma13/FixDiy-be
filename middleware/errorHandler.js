const constants = require('../constants')

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.json({ title:"validation Failed", message : err.message, stackTrace: err.stack});
    // console.log("the status code is : ", statusCode);

    
    switch (statusCode) {
        case constants.VALIDATION_FAILED:
            res.json({ title:"validation Failed", message : err.message, stackTrace: err.stack});
            break;
    
        case constants.NOT_FOUND:
            res.json({ title:"Not found ", message : err.message, stackTrace: err.stack});
            break;
    
        case constants.UNAUTHORIZED:
            res.json({ title:"Unauthorized ", message : err.message, stackTrace: err.stack});
            break;
    
        case constants.FORBIDDEN:
            res.json({ title:"FORBIDDEN", message : err.message, stackTrace: err.stack});
            break;
    
        case constants.SERVER_ERROR:
            res.json({ title:"Server error ", message : err.message, stackTrace: err.stack});
            break;
    
        default:
            break;
    }

   
};

module.exports = errorHandler;