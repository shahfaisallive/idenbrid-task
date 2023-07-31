import express from "express";
import colorRoutes from "./color.route.js";

const router = express.Router();

router.use("/color", colorRoutes);

export default router;