import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
    },
    loanPeriod: {
        type: String,
        required: [true, "Loan Period is required"]
    },
    loanAmount: {
        type: Number,
        required: [true, "Loan Amount is required"]
    },
    deposit: {
        type: Number,
        default: 0
    },
    paymentBreadDown: {
        type: Number,
    },
    remaining: {
        type: Number,
        required: [true, "Remaining Amount is required"]
    },
    status: {
        type: String,
        enum: ["pending", "approve", "reject"],
        default: "pending"
    },
    isCompleted: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

loanSchema.pre("save", async function (next) {
    const breakDownAmount = (this.loanAmount - this.deposit) / (this.loanPeriod * 12);
    this.paymentBreadDown = breakDownAmount
    next()
})

export const loanModel = mongoose.model("Loan", loanSchema)