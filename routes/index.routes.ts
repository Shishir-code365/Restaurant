import { Router } from "express";
import adminRouter from "./admin.routes";
import userRouter from "./user.routes";
import menuRouter from "./menu.routes";

const mainRouter = Router();

// mainRouter.get("/", (req, res) => {
//   res.send("wo wo wold");
// });
mainRouter.use("/admin", adminRouter).use("/user",userRouter).use("/menu",menuRouter);

export default mainRouter;