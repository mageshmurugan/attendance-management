import { Stream } from "stream";
import Class from "../models/Class.js";
import Staff from "../models/Staff.js";
import jwt from "jsonwebtoken";
import readline from "readline";

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

export const updateClass = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  // Create a readable stream from the file buffer
  const bufferStream = Stream.Readable.from(file.buffer);

  // Create readline interface
  const rl = readline.createInterface({
    input: bufferStream,
    terminal: false,
  });

  // Process each line from the file
  rl.on("line", (line) => {
    console.log(`Line from file: ${line}`);
  });
  rl.on("close", () => {
    console.log("File processed.");
  });

  res.json({ message: "Class updated" });
};
