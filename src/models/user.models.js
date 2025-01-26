import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    cnic: {
      type: String,
      length: 13,
      unique: true,
      required: [true, "Cnic number is required"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    requestsID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loan"
      }
    ]
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const userModel = mongoose.model("User", userSchema);
