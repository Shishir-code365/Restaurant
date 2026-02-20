//reservation route
import { Router } from "express";
import {tokenExtractor,verifyToken,adminScope}from "../middleware/tokenAuth";
import { reservation,getAllReservation, deleteReservation, adminApprove, approvedReservations, updateReservation } from "../controllers/reservations.controller";

const router = Router();

router.route("/create").post(tokenExtractor,verifyToken,reservation);
router.route("/all").get(tokenExtractor,verifyToken,adminScope,getAllReservation);
router.route("/delete/:id").delete(tokenExtractor,verifyToken,deleteReservation);
router.route("/approve").get(tokenExtractor,verifyToken,adminScope,approvedReservations);
router.route("/approve/:id").put(tokenExtractor,verifyToken,adminScope,adminApprove);
router.route("/update/:id").put(tokenExtractor,verifyToken,updateReservation);

export default router;