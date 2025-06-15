import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  addedMovies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie"
  },],
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
