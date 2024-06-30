import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
import express from "express";
import mongoose from "mongoose";
import staffsRoutes from "./routes/staffs.js";
import classRoutes from "./routes/classes.js";
import studentRoutes from "./routes/students.js";

const dbUrl = process.env.DB_URL;
async function connectToDatabase() {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
}
connectToDatabase();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/staffs", staffsRoutes);
app.use("/class", classRoutes);
app.use("/student", studentRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
