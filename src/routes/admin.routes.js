import express from "express";
import { authMiddleware, checkAdminMiddleware } from "../middleware/authentication.middleware.js";
import { proceedLoanRequest } from "../controllers/loans.controllers.js";
const router = express.Router();

router.post("/proceedLoanRequest", authMiddleware, checkAdminMiddleware, proceedLoanRequest)

export default router;