import { getAdminJob, getAllJobs, getJobById, postJob } from "../controller/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import express from "express";


const router = express.Router();
router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").post(isAuthenticated, getAdminJob);
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;