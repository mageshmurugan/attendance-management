import { Router } from "express";
const router = Router();
import { register, login, forgotPassword } from "../controllers/staffs.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgot-password").post(forgotPassword);

export default router;
