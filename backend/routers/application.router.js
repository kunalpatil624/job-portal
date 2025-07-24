import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controller/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import express from "express";


const router = express.Router();
router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);

export default router;