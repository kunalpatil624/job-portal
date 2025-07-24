import isAuthenticated from "../middlewares/isAuthenticated.js";
import express from "express";

import {login, register, updateProfile, logout} from "../controller/user.controller.js";
import {singleUpload}  from "../middlewares/multer.js"

const router = express.Router();
router.route("/register").post(singleUpload,register);
router.route("/logout").get(logout);
router.route("/login").post(login);
router.route("/profile/update").post(singleUpload,isAuthenticated,updateProfile);

export default router;