import express, { Application } from "express";
import basicRouter from "./routes/basic";
import usersRouter from "./routes/users";
import studentsRouter from "./routes/students";
import membersRouter from "./routes/members";
import passport from "./config/passport";

import { BACKEND_CONFIG } from "./utils/constant";
import { setupSwagger } from "./swagger";
import path from "path";

const app: Application = express();
// Setup Swagger
setupSwagger(app);

// Constants
const apiPrefix = BACKEND_CONFIG.GLOBAL.API_PREFIX;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(`${apiPrefix}/basic`, basicRouter);
app.use(`${apiPrefix}/users`, usersRouter);
app.use(`${apiPrefix}/students`, studentsRouter);

// Initialize Passport Middleware
app.use(passport.initialize());

app.use(`${apiPrefix}/members`, membersRouter);

export default app;
