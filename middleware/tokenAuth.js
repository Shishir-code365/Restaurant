"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.adminScope = exports.tokenExtractor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const tokenExtractor = (req, res, next) => {
    const token = req.get("authorization");
    if (!token) {
        return res.status(498).json({
            message: "token not found!",
        });
    }
    req.token = token.substring(7);
    next();
};
exports.tokenExtractor = tokenExtractor;
const adminScope = (req, res, next) => {
    let id;
    const { role, id: adminId } = jsonwebtoken_1.default.verify(req.token, process.env.ACCESS_SECRET);
    id = adminId;
    if (role !== "admin") {
        return res.status(401).json({
            message: "Insufficient scope!",
        });
    }
    req.admin = { id };
    next();
};
exports.adminScope = adminScope;
const verifyToken = (req, res, next) => {
    let id;
    try {
        let { id: userId } = jsonwebtoken_1.default.verify(req.token, process.env.ACCESS_SECRET);
        id = userId;
    }
    catch (e) {
        console.log(e);
        return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({ error: "Invalid Token!" });
    }
    // console.log(id);
    if (!id) {
        return res.status(401).json({
            message: "Invalid Token!",
        });
    }
    req.user = { id };
    next();
};
exports.verifyToken = verifyToken;
