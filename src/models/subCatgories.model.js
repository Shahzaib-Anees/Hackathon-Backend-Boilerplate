import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"]
        },
        parentCategorytitle: {
            type: String,
            required: [true, "Parent Category is required"]
        },
        parentCategotyID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories"
        }
        ,
        loanRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Loans"
            }
        ]
    },
    { timestamps: true }
)

export const subCategoryModel = mongoose.model("SubCategory", subCategorySchema)