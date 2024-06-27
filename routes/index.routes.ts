import { Router } from "express";
import adminRouter from "./admin.routes";
import userRouter from "./user.routes";
import menuRouter from "./menu.routes";
import reservationRouter from "./reservation.routes";
import contactRouter from "./contact.routes";
import reviewRouter from "./review.routes"

const mainRouter = Router();

// mainRouter.get("/", (req, res) => {
//   res.send("wo wo wold");
// });
mainRouter.use("/admin", adminRouter).use("/user",userRouter).use("/menu",menuRouter).use("/reservation",reservationRouter).use("/contact",contactRouter).use("/review",reviewRouter)

export default mainRouter;