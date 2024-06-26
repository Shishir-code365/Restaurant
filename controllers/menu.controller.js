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
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuAll = exports.menuDelete = exports.menuUpdate = exports.menuCreate = void 0;
const admin_model_1 = require("../models/admin.model");
const menu_model_1 = require("../models/menu.model");
const menuCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price } = req.body;
        const adminID = req.admin.id;
        if (!name || !price) {
            return res.status(400).json({
                success: false,
                message: "Name and price are required",
            });
        }
        const admin = yield admin_model_1.adminModel.findById(adminID);
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }
        const menuCreated = yield menu_model_1.menuModel.create({
            name,
            price,
            createdBy: adminID,
        });
        if (!menuCreated) {
            return res.status(403).json({ success: false, message: "Cannot create menu" });
        }
        res.status(200).json({
            success: true,
            message: "Menu created successfully!",
            menuCreated,
        });
    }
    catch (error) {
        console.error("Error creating menu:", error);
        next(error);
    }
});
exports.menuCreate = menuCreate;
const menuUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price } = req.body;
        const menuID = req.params.menuID;
        // console.log(menuID);
        const updateResult = yield menu_model_1.menuModel.updateOne({ _id: menuID }, { name, price });
        if (updateResult.modifiedCount > 0) {
            return res
                .status(200)
                .json({ message: "Menu updated successfully", updateResult });
        }
        else if (updateResult.modifiedCount === 0) {
            return res.status(404).json({ message: "No changes made" });
        }
        else {
            return res.status(403).json({ message: "Cannot update menu" });
        }
    }
    catch (error) {
        console.error("Error updating menu:", error);
        return res
            .status(500)
            .json({ message: "An error occurred while updating menu" });
    }
});
exports.menuUpdate = menuUpdate;
const menuDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const menuID = req.params.menuID;
    const adminID = req.admin.id;
    try {
        const menu = yield menu_model_1.menuModel.findById(menuID);
        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }
        if (menu.createdBy.toString() !== adminID) {
            return res.status(403).json({ message: "You are not authorized to delete this menu" });
        }
        yield menu_model_1.menuModel.findByIdAndDelete(menuID);
        return res.status(200).json({ message: "Menu deleted successfully", MenuID: menuID });
    }
    catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ message: "An error occurred while deleting menu" });
    }
});
exports.menuDelete = menuDelete;
const menuAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllMenu = yield menu_model_1.menuModel.find({});
        if (getAllMenu.length > 0) {
            return res.status(200).json(getAllMenu);
        }
        else {
            return res.status(404).json({ message: "No menu to show" });
        }
    }
    catch (error) {
        console.log("Error: ", error);
        return res.status(403).json("Error");
    }
});
exports.menuAll = menuAll;
