import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./utils/DB.js";
import userRoute from "./routers/user.router.js";
import companyRoute from "./routers/company.router.js";
import jobsRouter from "./routers/job.router.js";
import applicationRouter from "./routers/application.router.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://job-portal-1-95gk.onrender.com",
    "https://job-portal-ten-ruby-18.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobsRouter);
app.use("/api/v1/application", applicationRouter);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server run on port ${PORT}`);
    });
  } catch (err) {
    console.log("Error:", err);
    process.exit(1);
  }
};


startServer();
