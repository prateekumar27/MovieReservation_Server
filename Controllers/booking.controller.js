import mongoose from "mongoose";
import Booking from "../Models/booking.model.js";
import Movie from "../Models/movie.model.js";
import User from "../Models/user.model.js";

export const bookingController = async (req, res, next) => {
  const { movie, date, time, seats, user } = req.body;

  try {
    const existingMovie = await Movie.findById(movie);
    const existingUser = await User.findById(user);

    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new booking
    const newBooking = new Booking({
      movie,
      date,
      time,
      seats,
      user,
    });

    await newBooking.save();

    existingUser.bookings.push(newBooking._id);
    existingMovie.bookings.push(newBooking._id);

    await existingUser.save();
    await existingMovie.save();

    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error("Booking error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


export const getBookingByIdController = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("movie").populate("user");
    res.status(200).json({ bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


export const deleteBookingByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id).populate("user movie");
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
