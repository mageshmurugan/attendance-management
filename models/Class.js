import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    required: true,
    uppercase: true,
  },
  department: {
    type: String,
    required: true,
    uppercase: true,
  },
  expectedTotalHours: {
    type: Number,
    required: true,
  },
  hoursFinished: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  staff: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
  ],
});

export default mongoose.model("Class", classSchema);
