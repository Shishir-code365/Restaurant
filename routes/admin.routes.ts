//admin route
import { Router } from "express";
import { login, register } from "../controllers/admin.controller";


const router = Router()


router.route("/login").post(login)
router.route("/register").post(register)


export default router