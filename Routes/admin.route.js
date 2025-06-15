import { Router } from "express";
import {
  adminSignupController,
  adminSigninController,
  getAdminController,
} from "../Controllers/admin.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

export const adminRouter = Router();

// Admin signup
adminRouter.post("/signup", asyncHandler(adminSignupController));

// Admin signin
adminRouter.post("/signin", asyncHandler(adminSigninController));

// Admin get
adminRouter.get("/:id", asyncHandler(getAdminController));


