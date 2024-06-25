import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  hoursAttended: {
    type: Number,
    required: true,
    default: 0,
  },
  hoursFinished: {
    type: Number,
    required: true,
    default: 0,
  },
  expectedTotalHours: {
    type: Number,
    required: true,
    default: 0,
  },
  classes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
});

export default mongoose.model("Student", studentSchema);
