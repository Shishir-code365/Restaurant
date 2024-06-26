// import express from "express";
import express, { Request, Response, NextFunction } from 'express';
import http from "http";
import connectDb from "./utils/connection";
import mainRouter from "./routes/index.routes";
import { errorHandlerMiddleware } from "./middleware/errorHandler";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:4000",
    "https://admin.codynn.com",
    "https://codynn.com",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5050",
    "http://127.0.0.1:5050",
    "http://localhost:5174",
    "http://localhost:5413",
    "https://betacompiler.codynn.com",
    "http://localhost:9787",
    "https://beta.codynn.com",
  ],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ limit: "32kb", extended: true }));
app.use("/api", mainRouter);
app.use(errorHandlerMiddleware);
app.options("*", cors(corsOptions)); 

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Request Headers:', req.headers);

  const originalSend = res.send;
  res.send = (body: any) => {
    console.log('Response Headers:', res.getHeaders());
    return originalSend.call(res, body);
  };

  next();
});


const PORT = 3000;
const server = http.createServer(app);

connectDb()
  .then(() => {
    server.listen(PORT, () => console.log(`server is listening to port ${PORT}`));
  })
  .catch((err) => console.log("error", err));
