import { Router } from "express";
import {
  login,
  register
} from "../controllers/user.controller";
import { tokenExtractor, verifyToken } from "../middleware/tokenAuth";

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);

export default router;
