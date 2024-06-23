import { Router } from "express";
import { adminScope, tokenExtractor, verifyToken } from "../middleware/tokenAuth";
import { menuCreate,menuUpdate,menuDelete, menuAll } from "../controllers/menu.controller";

const router = Router();

router.route("/createmenu").post(tokenExtractor,verifyToken,adminScope,menuCreate);
router.route("/:menuID/updatemenu").put(tokenExtractor,verifyToken,adminScope,menuUpdate);
router.route("/:menuID/deletemenu").delete(tokenExtractor,verifyToken,adminScope,menuDelete);
router.route("/allmenu").get(menuAll);


export default router;