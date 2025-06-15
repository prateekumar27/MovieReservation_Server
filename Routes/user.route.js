import { Router } from "express";
import multer from "multer";
import {
  firstController,
  userSignupController,
  emailVerifyController,
  userSigninController,
  sendOtpController,
  verifyOtpController,
  passwordResetController,
  getBookingOfUserController,
} from "../Controllers/user.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import authCheck from "../Middelware/authCheck.middleware.js";
import { storage } from "../Middelware/multer.middleware.js";

export const Routes = Router();

Routes.get("/", authCheck, firstController);

//Routes for signup
Routes.post("/signup", asyncHandler(userSignupController));

//Routes for email verification
Routes.get(
  "/verify-email/:userId/:email_Token",
  asyncHandler(emailVerifyController)
);

//Routes for signin
Routes.post("/login", asyncHandler(userSigninController));

//Routes for password chnange otp routes
Routes.post("/send-otp", asyncHandler(sendOtpController));

//Routes for otp verification
Routes.post("/verify-otp", asyncHandler(verifyOtpController));

//Routes for password reset
Routes.post("/reset-password", asyncHandler(passwordResetController));

//Routes for get booking of user
Routes.get("/booking/:id", asyncHandler(getBookingOfUserController));
















//Routes for add image only from multer
// const upload = multer({ storage: storage });
// Routes.post("/add-image", upload.single("image"), async (req, res) => {
//   console.log(req.file);
//   res.status(200).json({ message: "Image uploaded successfully" });
// });

//Routes for add image with cloudinary
// const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 } });
// Routes.post("/add-image", upload.single("image"), async (req, res) => {
//   console.log(req.file);
//   res.status(200).json({ message: "Image uploaded successfully", image: req.file.path });
// });

//Routes for add image with cloudinary
// const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 } });
// Routes.post(
//   "/add-image",
//   upload.single("image"),
//   asyncHandler(addImageController)
// );
