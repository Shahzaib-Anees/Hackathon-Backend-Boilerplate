import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Category s required"]
    },
    subCategories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory"
        }
    ],
    maxLoan: {
        type: Number,
        required: [true, "Max Loan is required"]
    },
    maxLoanPeriod: {
        type: Number,
        required: [true, "Max Loan Period is required"]
    }
}, {
    timestamps: true
})

export const categoryModel = mongoose.model("Category", categorySchema);