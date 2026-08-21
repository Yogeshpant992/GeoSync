import { Router } from "express";
import { getTelemetryData, exportTelemetryCsv } from "../controllers/telemetry.controller.js";

const router = Router();

router.get("/telemetry", getTelemetryData);
router.get("/telemetry/export", exportTelemetryCsv);

export default router;