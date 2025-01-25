import express from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
  uploadImage,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.post("/uploadImage", uploadImage);
export default router;
