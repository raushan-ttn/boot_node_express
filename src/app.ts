import express, { Application } from "express";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
