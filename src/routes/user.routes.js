import express from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
  uploadImage,
} from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
import { authMiddleware } from "../middleware/authentication.middleware.js";
import { createLoanRequest } from "../controllers/loans.controllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.post("/createLoanRequest", authMiddleware, createLoanRequest)
export default router;
