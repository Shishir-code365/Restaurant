"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const connection_1 = __importDefault(require("./utils/connection"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "32kb" }));
app.use(express_1.default.urlencoded({ limit: "32kb", extended: true }));
// app.use("/api/users", authRouter);
app.use("/api", index_routes_1.default);
app.use(errorHandler_1.errorHandlerMiddleware);
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
};
app.use((0, cors_1.default)(corsOptions));
const PORT = 5677;
const server = http_1.default.createServer(app);
(0, connection_1.default)()
    .then(() => {
    server.listen(PORT, () => console.log("server is listening to port", PORT));
})
    .catch((err) => console.log("error", err));
