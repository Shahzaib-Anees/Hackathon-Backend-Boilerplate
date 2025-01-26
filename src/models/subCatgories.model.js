import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"]
        },
        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories"
        },
        loanRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Loans"
            }
        ]
    }, 
    {timestamps: true}
)

export const subCatrogoryModel = mongoose.model("SubCategory", subCategorySchema)