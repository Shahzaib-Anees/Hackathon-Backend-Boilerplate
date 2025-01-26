import express from "express";
import { createCategory, getCategory } from "../controllers/categories.controllers.js";
import { authMiddleware, checkAdminMiddleware } from "../middleware/authentication.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, checkAdminMiddleware, createCategory);
router.get("/get", getCategory);

export default router;