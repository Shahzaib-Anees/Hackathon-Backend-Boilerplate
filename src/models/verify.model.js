import mongoose, { mongo } from "mongoose";

const verifySchema = new mongoose.model({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    code: {
        type: String,
        required: [true, "Code is required"]
    }
}, {
    timestamps: true,
})

export const verifyModel = mongoose.model("Verify", verifySchema)