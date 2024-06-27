import { Router } from "express";
import { getAllContactForms, submitContactForm } from "../controllers/contact.controller";
import { tokenExtractor, verifyToken,adminScope } from "../middleware/tokenAuth";



const router = Router()


router.route("/create").post(submitContactForm);
router.route("/allContact").get(tokenExtractor,verifyToken,adminScope,getAllContactForms);


export default router