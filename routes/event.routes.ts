//event route
import { Router } from "express";
import { createEventPromotion, eventDelete, eventUpdate, getAllEventPromotions, getEventPromotionById } from "../controllers/events.controller";
import { tokenExtractor, verifyToken,adminScope } from "../middleware/tokenAuth";



const router = Router()


router.route("/create").post(tokenExtractor,verifyToken,adminScope,createEventPromotion);
router.route("/getEvents").get(getAllEventPromotions);
router.route("/getEvents/:id").get(getEventPromotionById);
router.route("/updateEvent/:id").put(tokenExtractor,verifyToken,adminScope,eventUpdate);
router.route("/delete/:id").delete(tokenExtractor,verifyToken,adminScope,eventDelete);



export default router