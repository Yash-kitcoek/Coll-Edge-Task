import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*"
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Task Tracker API is running" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
