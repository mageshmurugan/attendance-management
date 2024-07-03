import { Router } from "express";
const router = Router();
import {
  register,
  login,
  forgotPassword,
  inviteStaff,
  getStaff,
} from "../controllers/staffs.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/invite-staff").post(inviteStaff);
router.route("/forgot-password").post(forgotPassword);
router.route("/").get(getStaff);

export default router;
