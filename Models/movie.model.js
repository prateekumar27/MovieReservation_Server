import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    poster: { type: String, required: true },
    duration: { type: String, required: true },
    date: { type: String, required: true },

    // halls: { type: [String], required: true },
    // times: { type: [String], required: true },

    featured: { type: Boolean, default: false },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
