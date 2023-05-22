import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler, pageNotFound } from "./middlewares/handler.middleware";
import postRouter from "./routes/post.routes";
import userRouter from "./routes/user.routes";

dotenv.config();

const app: Express = express();

// x-disable
app.disable("x-powered-by");

// middlewares
app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.LOCAL_HOST
        : process.env.PRODUCTION_HOST,
  })
);

// routes
app.use("/api/", userRouter);
app.use("/api/", postRouter);

// handlers
app.use(pageNotFound);
app.use(errorHandler);

export default app;
