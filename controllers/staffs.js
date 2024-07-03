import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Staff from "../models/Staff.js";

// const isMatch = bcrypt.compareSync("password", hash);
// console.log(isMatch);

export const register = async (req, res) => {
  const { querytoken } = req.query;
  const { name, password } = req.body;
  const { staffEmail, staffId } = jwt.verify(
    querytoken,
    process.env.JWT_SECRET
  );
  // const { email, password, name } = req.body;
  console.log(req.body);
  const hash = bcrypt.hashSync(password, 10);
  const invitedBy = await Staff.findById(staffId);
  invitedBy.inviteStaff.push(staffEmail);
  await invitedBy.save();
  const staff = new Staff({
    name,
    email: staffEmail,
    password: hash,
    invitedBy: invitedBy.email,
  });
  await staff.save();
  const token = jwt.sign({ staffId: staff._id }, process.env.JWT_SECRET);
  return res.json({ token });
};

export const inviteStaff = async (req, res) => {
  const { email, id } = req.body;
  const StaffMail = jwt.sign(
    { staffEmail: email, staffId: id },
    process.env.JWT_SECRET
  );
  console.log(StaffMail);
  return res.json({ message: "Staff invite sent" });
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
  // console.log(staff);
  return res.json({ token });
};

export const getStaff = async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const staff = await Staff.findById(decoded.staffId).populate("classes");
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    console.log(staff);
    return res.json({
      name: staff.name,
      email: staff.email,
      class: staff.classes,
    });
  }
  return res.status(401).json({ message: "Not authorized" });
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
