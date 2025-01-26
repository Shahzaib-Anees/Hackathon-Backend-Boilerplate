import {
  generateAccessToken,
  decryptPassword,
} from "../methods/authenticationMethods.js";
import { uploadImageToCloudinary } from "../methods/cloudinary.methods.js";
import { generatePassword } from "../methods/generatePassword.methods.js";
import { userModel } from "../models/user.models.js";

const registerUser = async (req, res) => {
  const { name, email, cnic } = req.body;

  if (!name) return res.status(400).json({ message: "Name is required" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!cnic) return res.status(400).json({ message: "Cnic number is required" });
  console.log(name, email, cnic);

  const ifEmailFound = await userModel.findOne({ email });
  if (ifEmailFound)
    return res.status(400).json({ message: "Email already exists" });
  const password = await generatePassword(name, email)
  try {
    const newUser = await userModel.create({
      name: name,
      email: email,
      cnic: cnic,
      password : password,
    });
    const accessToken = generateAccessToken(newUser);
    res.status(201).json({
      message: "User registered successfully",
      data: newUser,
      ACCESS_TOKEN: accessToken,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });

  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "No user exists with this email address" });
  }

  const isValidPassword = await decryptPassword(password, user?.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Incorrect password" });
  } else {
    const accessToken = generateAccessToken(user);
    res.status(200).json({
      message: "User logged in successfully",
      data: user,
      ACCESS_TOKEN: accessToken,
    });
  }
};

const uploadImage = async (req, res) => {
  const image = req.file.path || req.body.image;
  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }
  try {
    const link = await uploadImageToCloudinary(image);
    return res
      .status(200)
      .json({ message: "Image uploaded successfully", link });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const logOutUser = async (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "User logged out successfully" });
};


export { registerUser, loginUser, logOutUser, uploadImage };
