import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Theater name is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    totalSeats: {
      type: Number,
      required: [true, "Total number of seats is required"],
    },
    shows: [
      {
        movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
        time: String,
        date: String,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Theater", theaterSchema);
