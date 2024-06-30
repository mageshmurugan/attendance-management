import { Stream } from "stream";
import Class from "../models/Class.js";
import Staff from "../models/Staff.js";
import jwt from "jsonwebtoken";
import readline from "readline";
import { get } from "http";
import { type } from "os";
import { parse } from "path";

export const createClass = async (req, res) => {
  const { year, section, department, expectedTotalHours, staffToken } =
    req.body;
  const staffId = jwt.verify(staffToken, process.env.JWT_SECRET);
  const newClass = new Class({
    year,
    section,
    department,
    expectedTotalHours,
    staff: [staffId.staffId],
  });
  await newClass.save();
  const staff = await Staff.findById(staffId.staffId);
  staff.classes.push(newClass._id);
  await staff.save();
  return res.json(newClass);
};
export const updateStudentList = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  const StudentMail = jwt.sign(
    { studentEmail: email, classId: id },
    process.env.JWT_SECRET
  );
  console.log(StudentMail);
  return res.json({ message: "Student list updated" });
};

export const updateStaffList = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  const getClass = await findById(id);
  getClass.staff.push(email);
  await getClass.save();
  return res.json({ message: "Staff list updated" });
};
export const updateClass = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const getClass = await Class.findById(id).populate("students");

  // console.log(index);

  // Create a readable stream from the file buffer
  const bufferStream = Stream.Readable.from(file.buffer);

  // Create readline interface
  const rl = readline.createInterface({
    input: bufferStream,
    terminal: false,
  });

  // Process each line from the file
  let bool = false;
  let hoursFinished = 0;
  rl.on("line", (line) => {
    if (bool) {
      const [studentId, hours] = line.split(" ");
      const index = getClass.students.find(
        (student) => student.studentId === studentId
      );
      if (index) {
        index.hoursFinished += hoursFinished;
        index.hoursAttended += parseInt(hours);
        index.expectedTotalHours = getClass.expectedTotalHours;
        index.save();
      }
    } else {
      getClass.hoursFinished += parseInt(line);
      getClass.save();
      hoursFinished = parseInt(line);
      bool = true;
    }
  });
  rl.on("close", () => {
    console.log("File processed.");
  });

  res.json({ message: "Class updated" });
};
