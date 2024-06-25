import { Router } from "express";
const router = Router();
import { createClass, updateClass } from "../controllers/classes.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.route("/create").post(createClass);
router.route("/update/:id").post(upload.single("file"), updateClass);
export default router;
