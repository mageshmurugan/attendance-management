import { Router } from "express";
const router = Router();
import { register, login } from "../controllers/students.js";

router.route("/register").post(register);
router.route("/login").post(login);
// router.route("/forgot-password").post(forgotPassword);

export default router;
