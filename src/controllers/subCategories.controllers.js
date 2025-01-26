import { categoryModel } from "../models/categories.model.js";
import { subCategoryModel } from "../models/subCatgories.model.js";
const createSubCategory = async (req, res) => {
    const { title, parentCategory } = req.body;
    try {
        const category = await categoryModel.findOne({ title, parentCategory });
        if (!category) {
            return res.status(400).json({ message: "Category not created" });
        }
        const createdSubCategory = await subCategoryModel.create({
            title,
            parentCategory: {
                title: category.title,
                parentCategoryID: category.id
            }
        });

        return res.status(201).json({ message: "Category created successfully", createdSubCategory });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }

}

const findCategoryByParentCategory = async (req, res) => {
    const { parentCategoryTitle } = req.params;
    try {
        const category = await categoryModel.findOne({ parentCategoryTitle });
        if (!category) {
            return res.status(400).json({ message: "Category not found" });
        }
        const subCategories = await subCategoryModel.findOne({ parentCategotyID: category._id });
        return res.status(200).json({ message: "Category found", subCategories });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { createSubCategory, findCategoryByParentCategory };