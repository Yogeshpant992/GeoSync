// src/app.js
import express from "express";
import cors from "cors";
import telemetryRoutes from "./routes/telemetry.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", telemetryRoutes);

export default app;