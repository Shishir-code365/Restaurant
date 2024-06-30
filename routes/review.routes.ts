import { Router } from "express";
import { deleteReview, getAllReviews, getReviewById, reviewCreate,updateReview } from "../controllers/review.controller";
import { tokenExtractor,verifyToken } from "../middleware/tokenAuth";

const router = Router();

router.route("/createreview").post(reviewCreate);
router.route("/getreview").get(getAllReviews);
router.route("/getreview/:id").get(getReviewById);
router.route("/updatereview/:id").put(tokenExtractor,verifyToken,updateReview);
router.route("/deletereview/:id").delete(tokenExtractor,verifyToken,deleteReview);
export default router;