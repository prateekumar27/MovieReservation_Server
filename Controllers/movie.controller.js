import movieModel from "../Models/movie.model.js";
import jwt from "jsonwebtoken";
import Admin from "../Models/admin.model.js";

export const addMovieController = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const { id: adminId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const {
      title,
      description,
      duration,
      poster,
      date
    } = req.body;

    // Validate required fields
    if (
      !title?.trim() ||
      !description?.trim() ||
      !duration?.trim() ||
      !poster?.trim() ||
      !date?.trim()
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save movie
    const movie = new movieModel({
      title,
      description,
      duration,
      poster,
      featured: true,
      date, // string directly, no new Date()
      admin: adminId,
    });

    await movie.save();

    // Associate movie with admin
    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.addedMovies.push(movie._id);
    await admin.save();

    res.status(201).json({ message: "Movie added successfully", movie });
  } catch (error) {
    console.error("Error adding movie:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getAllMovieController = async (req, res, next) => {
  try {
    const movies = await movieModel.find();
    res.status(200).json({ movies });
  } catch (error) {
    next(error);
  }
};

export const getMovieByIdController = async (req, res, next) => {
  try {
    const movie = await movieModel.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.status(200).json({ movie });
  } catch (error) {
    next(error);
  }
};


export const deleteMovieByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await movieModel.findByIdAndDelete(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateMovieByIdController = async (request, response, next) => {
    const { id } = request.params;
    const updates = request.body;

    const movie = await movieModel.findByIdAndUpdate(id, updates, { new: true });
    if (!movie) {
        return response.status(404).json({
            success: false,
            message: 'Movie not found'
        });
    }
    response.status(200).json({
        success: true,
        message: 'Movie updated successfully',
        movie
    });
};