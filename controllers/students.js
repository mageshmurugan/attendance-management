import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Class from "../models/Class.js";

export const register = async (req, res) => {
  const { token } = req.query;
  const { name, password, studentId } = req.body;
  const { studentEmail, classId } = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log(studentEmail, classId);
  const hash = bcrypt.hashSync(password, 10);
  const student = new Student({
    name,
    email: studentEmail,
    password: hash,
    studentId,
    classes: classId,
  });
  await student.save();
  console.log(student);
  const studentClass = await Class.findById(classId);
  studentClass.students.push(student._id);
  await studentClass.save();

  return res.json({ message: "Success" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  const isMatch = bcrypt.compareSync(password, student.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET);
  console.log(student);
  return res.json({ token });
};
