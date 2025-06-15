import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  seats: { type: [String], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
