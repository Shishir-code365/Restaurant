import { Router } from "express";
import {tokenExtractor,verifyToken}from "../middleware/tokenAuth";
import { reservation } from "../controllers/reservations.controller";

const router = Router();

router.route("/").post(tokenExtractor,verifyToken,reservation);

export default router;