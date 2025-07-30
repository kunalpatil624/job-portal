import dotenv from "dotenv";
dotenv.config({});
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/DB.js";
import userRoute from "./routers/user.router.js";
import companyRoute from "./routers/company.router.js";
import jobsRouter from "./routers/job.router.js";
import applicationRouter from './routers/application.router.js';

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions ={
    origin:['http://localhost:5173' , "https://job-portal-8v6p8pe16-kunalpatil624s-projects.vercel.app"],
    credentials: true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

//api calling
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobsRouter);
app.use("/api/v1/application", applicationRouter);


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();



