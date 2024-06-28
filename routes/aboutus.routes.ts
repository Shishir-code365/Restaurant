import { Router } from "express";
import { aboutusCreate, aboutusDelete, aboutusUpdate, getAboutUs } from "../controllers/aboutus.controller";
import { tokenExtractor, verifyToken,adminScope } from "../middleware/tokenAuth";

const router = Router();   

router.route("/create").post(tokenExtractor,verifyToken,adminScope,aboutusCreate);
router.route("/update/:id").put(tokenExtractor,verifyToken,adminScope,aboutusUpdate);
router.route("/get").get(getAboutUs);
router.route("/delete").delete(tokenExtractor,verifyToken,adminScope,aboutusDelete);


export default router;