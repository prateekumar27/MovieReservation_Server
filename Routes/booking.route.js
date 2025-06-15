import { Router } from "express";
import { bookingController, getBookingByIdController, deleteBookingByIdController } from "../Controllers/booking.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

export const bookingRouter = Router();

bookingRouter.post("/new-booking", asyncHandler(bookingController));

bookingRouter.get("/:id", asyncHandler(getBookingByIdController));

bookingRouter.delete("/:id", asyncHandler(deleteBookingByIdController));