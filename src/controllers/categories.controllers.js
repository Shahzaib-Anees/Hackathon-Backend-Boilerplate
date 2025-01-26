import { categoryModel } from "../models/categories.model.js";
const createCategory = async (req, res) => {
    const { title, maxLoanPeriod, maxLoan } = req.body;
    if (!title || !maxLoanPeriod || !maxLoan) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    try {
        const existigCategory = await categoryModel.findOne({ title })
        if (existigCategory) {
            return res.status(400).json({
                success: false,
                message: "Category already exist"
            })
        }
        const category = await categoryModel.create({
            title,
            maxLoanPeriod,
            maxLoan
        })
        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const getCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find({}).populate("subCategories")
        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            categories
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export { createCategory, getCategory }