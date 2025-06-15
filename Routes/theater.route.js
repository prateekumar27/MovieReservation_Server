import express from "express";
import {
  addTheaterController,
  getAllTheaterController,
  updateTheaterController,
  deleteTheaterController,
} from "../Controllers/theater.controller.js";

import asyncHandler from "../utils/asyncHandler.js";
import authCheck from "../Middelware/authCheck.middleware.js";

export const theaterRoutes = express.Router();

// Admin only
theaterRoutes.post(
  "/addtheater",
  authCheck,
  asyncHandler(addTheaterController)
);

theaterRoutes.get("/", getAllTheaterController);
theaterRoutes.put("/update/:id", asyncHandler(updateTheaterController));

theaterRoutes.delete("/delete/:id", asyncHandler(deleteTheaterController));
