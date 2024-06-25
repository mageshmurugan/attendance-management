import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Staff from "../models/Staff.js";

// const isMatch = bcrypt.compareSync("password", hash);
// console.log(isMatch);

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  console.log(req.body);
  const hash = bcrypt.hashSync(password, 10);
  const staff = new Staff({
    name,
    email,
    password: hash,
  });
  await staff.save();
  const token = jwt.sign({ staffId: staff._id }, process.env.JWT_SECRET);
  return res.json({ token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const staff = await Staff.findOne({ email });
  if (!staff) {
    return res.status(404).json({ message: "Staff not found" });
  }
  const isMatch = bcrypt.compareSync(password, staff.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ staffId: staff._id }, process.env.JWT_SECRET);
  console.log(staff);
  return res.json({ token });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const staff = await Staff.findOne({ email });
  if (!staff) {
    return res.status(404).json({ message: "Staff not found" });
  }
  // Send email with reset password link
  return res.json({ message: "Email sent" });
};
