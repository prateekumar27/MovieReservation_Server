import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    emailToken: { type: String, default: null },
    isMailVerified: { type: Boolean, default: false },
    otp: { type: String, default: null },
    // bookedMovies: { type: [String], default: [] },
    // watchedMovies: { type: [String], default: [] },

    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
