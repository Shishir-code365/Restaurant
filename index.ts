import express from "express";
import http, { request } from "http";
import connectDb from "./utils/connection";
import mainRouter from "./routes/index.routes";
import { errorHandlerMiddleware } from "./middleware/errorHandler";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ limit: "32kb", extended: true }));
app.use("/api", mainRouter);
app.use(errorHandlerMiddleware);
app.options("*", cors(corsOptions)); 



const PORT = 5677;
const server = http.createServer(app);

connectDb()
  .then(() => {
    server.listen(PORT, () => console.log(`server is listening to port ${PORT}`));
  })
  .catch((err) => console.log("error", err));
