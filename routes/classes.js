import { Router } from "express";
const router = Router();
import {
  createClass,
  updateClass,
  updateStudentList,
} from "../controllers/classes.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.route("/create").post(createClass);
router.route("/update/:id/updatelist").post(updateStudentList);
router.route("/update/:id").post(upload.single("file"), updateClass);
export default router;
