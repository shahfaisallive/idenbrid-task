import express from "express";
import { addTone, createColor, deleteColor, deleteTone, getAllColors, updateTone } from "../controllers/color.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/", createColor);
router.get("/", getAllColors);
router.delete("/:id", deleteColor);
router.post("/tone", upload.single('image'), addTone);
router.put("/tone/:id", updateTone);
router.delete("/tone/:id", deleteTone);


export default router;