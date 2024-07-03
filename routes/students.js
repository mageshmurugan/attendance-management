import { Router } from "express";
const router = Router();
import { register, login, getStudent } from "../controllers/students.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(getStudent);
// router.route("/forgot-password").post(forgotPassword);

export default router;
