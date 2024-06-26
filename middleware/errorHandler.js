"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const errorHandlerMiddleware = (error, req, res, next) => {
    console.log(Object.assign({}, error));
    if (error.name == "CastError" && error.kind == "ObjectId") {
        return res
            .status(401)
            .json({ success: false, message: `invalid id : ${error.stringValue}  ` });
    }
    if (error.name == "TokenExpiredError") {
        return res.status(401).json({ success: false, message: "token expired !" });
    }
    if (error.name == "JsonWebTokenError") {
        return res.status(401).json({ success: false, message: "token invalid !" });
    }
    if (error) {
        return res.status(500).json({ success: false, message: error });
    }
    next();
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
