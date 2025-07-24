import { CompanyRegister, companyUpdate, getCompany, getCompanyById } from "../controller/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import express from "express";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();
router.route("/register").post(isAuthenticated, CompanyRegister);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(singleUpload, isAuthenticated, companyUpdate);

export default router;