"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = require("../models/user.model");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const userFound = yield user_model_1.userModel.findOne({ email });
    if (userFound) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json("email already exists!");
    }
    const hash = yield bcrypt_1.default.hash(password, 10);
    const savedUser = yield new user_model_1.userModel({
        username,
        email,
        passwordHash: hash,
    }).save();
    if (!savedUser) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json("fail to create user!");
    }
    return res.status(200).json({ message: "user created successful", savedUser });
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email && !password) {
        return res.status(403).json({
            message: "Invalid credentials!",
        });
    }
    user_model_1.userModel
        .findOne({ email })
        .then((userFound) => {
        if (!userFound) {
            return res.status(422).json({
                message: "User not found!",
            });
        }
        bcrypt_1.default
            .compare(password, userFound.passwordHash)
            .then((compare) => {
            if (!compare) {
                return res.status(403).json({
                    message: "Invalid Password!",
                });
            }
            const token = jsonwebtoken_1.default.sign({
                id: userFound._id,
                role: "user",
            }, process.env.ACCESS_SECRET);
            return res.json({
                message: "Logged In successfully!",
                token,
            });
        })
            .catch((err) => next(err));
    })
        .catch((err) => next(err));
});
exports.login = login;
