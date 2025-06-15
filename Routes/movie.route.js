import { Router } from "express";
import {
  addMovieController,
  getAllMovieController,
  getMovieByIdController,
  deleteMovieByIdController,
  updateMovieByIdController
} from "../Controllers/movie.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { upload } from "../Middelware/multer.middleware.js";
import authMiddleware from "../Middelware/authCheck.middleware.js";

export const movieRouter = Router();

movieRouter.post("/add-movie", upload.single("poster"), asyncHandler(addMovieController));
movieRouter.get("/get-movies", asyncHandler(getAllMovieController));
movieRouter.get("/:id", asyncHandler(getMovieByIdController));


movieRouter.delete("/delete/:id", authMiddleware, asyncHandler(deleteMovieByIdController));

movieRouter.put("/update/:id", authMiddleware, asyncHandler(updateMovieByIdController));
