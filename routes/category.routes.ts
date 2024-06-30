
import {Router} from "express";
import { tokenExtractor, verifyToken } from "../middleware/tokenAuth";
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/category.controller";


const router = Router();

router.route("/create").post(tokenExtractor,verifyToken,createCategory);
router.route("/all").get(getAllCategories);
router.route("/get/:id").get(getCategoryById);
router.route("/update/:id").put(tokenExtractor,verifyToken,updateCategory);
router.route("/delete/:id").delete(tokenExtractor,verifyToken,deleteCategory);

export default router