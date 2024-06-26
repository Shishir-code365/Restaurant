"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_routes_1 = __importDefault(require("./admin.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const menu_routes_1 = __importDefault(require("./menu.routes"));
const reservation_routes_1 = __importDefault(require("./reservation.routes"));
const mainRouter = (0, express_1.Router)();
// mainRouter.get("/", (req, res) => {
//   res.send("wo wo wold");
// });
mainRouter.use("/admin", admin_routes_1.default).use("/user", user_routes_1.default).use("/menu", menu_routes_1.default).use("/reservation", reservation_routes_1.default);
exports.default = mainRouter;
