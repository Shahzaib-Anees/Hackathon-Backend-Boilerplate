import express from 'express';
import { createSubCategory, findCategoryByParentCategory } from '../controllers/subCategories.controllers.js';

const router = express.Router();

router.post("/createSubCategory", createSubCategory);
router.get("/findCategoryByParentCategory/:parentCategoryTitle", findCategoryByParentCategory);

export default router;