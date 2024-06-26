"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenAuth_1 = require("../middleware/tokenAuth");
const reservations_controller_1 = require("../controllers/reservations.controller");
const router = (0, express_1.Router)();
router.route("/create").post(tokenAuth_1.tokenExtractor, tokenAuth_1.verifyToken, reservations_controller_1.reservation);
router.route("/all").get(tokenAuth_1.tokenExtractor, tokenAuth_1.verifyToken, tokenAuth_1.adminScope, reservations_controller_1.getAllReservation);
router.route("/delete/:id").delete(tokenAuth_1.tokenExtractor, tokenAuth_1.verifyToken, reservations_controller_1.deleteReservation);
router.route("/approve").get(tokenAuth_1.tokenExtractor, tokenAuth_1.verifyToken, tokenAuth_1.adminScope, reservations_controller_1.approvedReservations);
router.route("/approve/:id").put(tokenAuth_1.tokenExtractor, tokenAuth_1.verifyToken, tokenAuth_1.adminScope, reservations_controller_1.adminApprove);
router.route("/update/:id").put(tokenAuth_1.tokenExtractor, tokenAuth_1.verifyToken, reservations_controller_1.updateReservation);
exports.default = router;