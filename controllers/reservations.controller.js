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
exports.approvedReservations = exports.adminApprove = exports.deleteReservation = exports.getAllReservation = exports.reservation = void 0;
const user_model_1 = require("../models/user.model");
const reservations_model_1 = require("../models/reservations.model");
const admin_model_1 = require("../models/admin.model");
const reservation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.user.id;
    const user = yield user_model_1.userModel.findById(userID);
    if (!user) {
        return res.status(400).json("Cannot find the user");
    }
    const { name, email, date, time, noOfPersons } = req.body;
    const makeReservation = yield reservations_model_1.reservationModel.create({
        name,
        email,
        date,
        time,
        noOfPersons,
        reservedBy: userID
    });
    if (!makeReservation) {
        return res.status(403).json("Cannot make reservation");
    }
    return res.status(200).json("Reservation made successfully!!");
});
exports.reservation = reservation;
const getAllReservation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservations = yield reservations_model_1.reservationModel.find({});
        if (reservations.length > 0) {
            return res.status(200).json({ reservations });
        }
        return res.status(403).json("No reservations to show");
    }
    catch (error) {
        return res.status(404).json("error");
    }
});
exports.getAllReservation = getAllReservation;
const deleteReservation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.user.id;
    const reservationID = req.params.id;
    const user = yield user_model_1.userModel.findById(userID);
    if (!user) {
        return res.status(404).json("Cannot find user");
    }
    const checkReservation = yield reservations_model_1.reservationModel.findById(reservationID);
    if (!checkReservation) {
        return res.status(404).json("Cannot find reservation");
    }
    // console.log(checkReservation.reservedBy.toString());
    if (checkReservation.reservedBy.toString() !== userID) {
        return res.status(404).json("Not authorized to delete the reservation!!!");
    }
    if (checkReservation.approved) {
        return res.status(403).json({ message: "Cannot delete an approved reservation" });
    }
    const reservationDelete = yield reservations_model_1.reservationModel.findByIdAndDelete(reservationID);
    if (!reservationDelete) {
        return res.status(404).json("Cannot delete reservation");
    }
    return res.status(200).json({ message: "Reservation Deleted Successfully!!", reservationID });
});
exports.deleteReservation = deleteReservation;
const adminApprove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const adminID = req.admin.id;
    const reservationID = req.params.id;
    const admin = yield admin_model_1.adminModel.findById(adminID);
    if (!admin) {
        return res.status(404).json("Admin doesnot exist!!");
    }
    const reservation = yield reservations_model_1.reservationModel.findById(reservationID);
    if (!reservation) {
        return res.status(404).json("Reservation not found");
    }
    reservation.approved = true;
    yield reservation.save();
    return res.status(200).json({ message: "Reservation approved", reservation });
});
exports.adminApprove = adminApprove;
const approvedReservations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const approvedReservations = yield reservations_model_1.reservationModel.find({ approved: true });
        res.status(200).json(approvedReservations);
    }
    catch (error) {
        console.error("Error retrieving approved reservations:", error);
        res.status(500).json({ message: "An error occurred while retrieving approved reservations" });
    }
});
exports.approvedReservations = approvedReservations;
