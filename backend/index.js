// import dotenv from "dotenv";
// dotenv.config({});
// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import connectDB from "./utils/DB.js";
// import userRoute from "./routers/user.router.js";
// import companyRoute from "./routers/company.router.js";
// import jobsRouter from "./routers/job.router.js";
// import applicationRouter from './routers/application.router.js';

// const app = express();

// //middleware
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(cookieParser());

// const corsOptions = {
//   origin: function (origin, callback) {
//     const allowedOrigins = [
//       "http://localhost:5173",
//       "https://job-portal-1-95gk.onrender.com",
//       "https://job-portal-sepia-five.vercel.app" 
//     ];
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };


// app.use(cors(corsOptions));

// const PORT = process.env.PORT || 3000;

// //api calling
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobsRouter);
// app.use("/api/v1/application", applicationRouter);


// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`Server running at port ${PORT}`);
//     });
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// startServer();



// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import connectDB from "./utils/DB.js";

// // routes
// import userRoute from "./routers/user.router.js";
// import companyRoute from "./routers/company.router.js";
// import jobsRouter from "./routers/job.router.js";
// import applicationRouter from './routers/application.router.js';

// const app = express();

// // middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://job-portal-1-95gk.onrender.com");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
//   // For preflight requests
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });

// const corsOptions = {
//   origin: function (origin, callback) {
//     const allowedOrigins = [
//       "http://localhost:5173",
//       "https://job-portal-1-95gk.onrender.com",
//       "https://job-portal-sepia-five.vercel.app"
//     ];
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("CORS error"));
//     }
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); // preflight fix

// // routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobsRouter);
// app.use("/api/v1/application", applicationRouter);

// // server start
// const PORT = process.env.PORT || 3000;
// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`Server chalu ho gaya on port ${PORT}`);
//     });
//   } catch (err) {
//     console.log("Error:", err);
//     process.exit(1);
//   }
// };

// startServer();


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
    "https://job-portal-sepia-five.vercel.app"
  ],
  credentials: true
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
