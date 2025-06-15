import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import sendEmail from "../Service/service.mailer.js";
import CustomError from "../utils/errorHandler.js";
import crypto from "crypto";
import dotenv from "dotenv";
import {
  emailVerificationTemplate,
  otpVerificationTemplate,
} from "../Templates/mailTemplates.js";
import jwt from "jsonwebtoken";
import Movie from "../Models/movie.model.js";

dotenv.config();

const firstController = (req, res) => {
  console.log(req.user);
  const { name } = req.user;
  res.status(200).json(`Welcome ${name}`);
};

//user signup
const userSignupController = async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    throw new CustomError("All fields are required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError("email already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const email_Token = crypto.randomBytes(64).toString("hex");

  const userDetails = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    emailToken: email_Token,
  });

  const userId = userDetails._id;
  const verifyUrl = `http://localhost:3000/api/verify-email/${userId}/${email_Token}`;
  const subject = "Email verification";

  const content = emailVerificationTemplate({ userName: name, verifyUrl });

  await sendEmail(email, subject, content);

  res.status(201).json({
    message: "User created successfully",
    data: userDetails,
  });
};

//email verification
const emailVerifyController = async (req, res) => {
  const { userId, email_Token } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  if (user.emailToken !== email_Token) {
    return res
      .status(400)
      .redirect("http://localhost:5173/verification-failed");
    // throw new CustomError("Invalid email token", 400);
  }
  user.isMailVerified = true;
  user.emailToken = undefined;
  await user.save();
  return res.status(200).redirect("http://localhost:5173/login");
};

//user signin
const userSigninController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("All fields are required", 404);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new CustomError("Invalid credentials", 401);
  }

  if (!user.isMailVerified) {
    return res.status(401).json({
      message: "Please verify your email before logging in",
      redirectUrl: `${process.env.FRONTEND_URL}/verify-email`,
    });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );

  // Optionally still set it in headers (for browser use)
  res.set("Authorization", `Bearer ${token}`);

  // ✅ Include the token in the response body
  res.status(200).json({
    message: "User signed in successfully",
    redirectUrl: `${process.env.FRONTEND_URL}/`,
    id: user._id,
    name: user.name,
    token, // ✅ Include token here
  });
};


//send otp
const sendOtpController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError("Email is required", 400);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  const generated_otp = Math.floor(Math.random() * 10000 + 10000);

  user.otp = generated_otp;
  await user.save();

  const subject = "Password Reset OTP";
  const content = otpVerificationTemplate.replace("{otp}", generated_otp);
  sendEmail(email, subject, content);

  res.status(200).json({
    message: "OTP sent successfully",
    redirectUrl: `${process.env.FRONTEND_URL}/verify-otp`,
  });
};

//verify otp
const verifyOtpController = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new CustomError("All fields are required", 400);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  if (user.otp !== otp) {
    throw new CustomError("Invalid OTP", 400);
  }
  user.otp = undefined;
  await user.save();

  res.status(200).json({
    message: "OTP verified successfully",
    redirectUrl: `${process.env.FRONTEND_URL}/reset-password`,
  });
};

//password reset
const passwordResetController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError("All fields are required", 400);
  }
  const user = await User.findOne({ email });

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();
  res.status(200).json({
    message: "Password reset successfully",
    redirectUrl: `${process.env.FRONTEND_URL}/login`,
  });
};

//get booking of user
const getBookingOfUserController = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("bookings");
  res.status(200).json(user.bookings);
};

//Export controllers
export {
  firstController,
  userSignupController,
  emailVerifyController,
  userSigninController,
  sendOtpController,
  verifyOtpController,
  passwordResetController,
  getBookingOfUserController,
};
