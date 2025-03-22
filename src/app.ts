import express, { Application } from "express";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import { BACKEND_CONFIG } from "./utils/constant";
import path from "path";

const app: Application = express();

// Constants
const apiPrefix = BACKEND_CONFIG.GLOBAL.API_PREFIX;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(`${apiPrefix}/`, indexRouter);
app.use(`${apiPrefix}/users`, usersRouter);

export default app;
