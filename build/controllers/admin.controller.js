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
const admin_model_1 = require("../models/admin.model");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let passwordHash;
    if (!email || !password) {
        return res.status(422).json({ error: "please add email or password" });
    }
    const admin = yield admin_model_1.adminModel.find({});
    if (admin.length > 0) {
        return res.status(403).json({ error: "Admin User already exists!" });
    }
    admin_model_1.adminModel.findOne({ email }).then((admin) => {
        if (admin)
            return res.status(403).json({ error: "Admin User already exists!" });
        bcrypt_1.default
            .hash(password, 10)
            .then((hash) => {
            passwordHash = hash;
            new admin_model_1.adminModel({
                email,
                passwordHash,
            })
                .save()
                .then((savedAdmin) => {
                return res.status(201).json({
                    message: "Admin user created successfully!",
                    user: savedAdmin,
                });
            })
                .catch((err) => console.log(err));
        })
            .catch((err) => console.log(err));
    });
});
exports.register = register;
const login = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(403).json({ error: "Invalid user credentials!" });
    }
    admin_model_1.adminModel.findOne({ email: email }).then((admin) => {
        if (!admin) {
            return res.status(422).json({ error: "Admin User not found!" });
        }
        bcrypt_1.default
            .compare(password, admin.passwordHash)
            .then((doMatch) => {
            if (doMatch) {
                const token = jsonwebtoken_1.default.sign({ id: admin._id, role: "admin" }, process.env.ACCESS_SECRET);
                res.status(201).json({
                    message: "Logged In Successfully!",
                    token,
                });
            }
            else {
                return res.status(403).json({ error: "Invalid password!" });
            }
        })
            .catch((err) => {
            console.log(err);
        });
    });
};
exports.login = login;
