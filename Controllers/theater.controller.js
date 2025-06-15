import Theater from "../Models/theater.model.js";

// Add Theater
export const addTheaterController = async (req, res) => {
  try {
    const { name, location, totalSeats, shows } = req.body;
    const adminId = req.user.id;

    if (!name || !location || !totalSeats) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTheater = await Theater.create({
      name,
      location,
      totalSeats,
      shows,
      createdBy: adminId,
    });

    res.status(201).json({ message: "Theater added successfully", theater: newTheater });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Theaters
export const getAllTheaterController = async (req, res) => {
  try {
    const theaters = await Theater.find().populate("createdBy", "name email");
    res.status(200).json({ theaters });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch theaters", error: error.message });
  }
};

// Update Theater
export const updateTheaterController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTheater = await Theater.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTheater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    res.status(200).json({ message: "Theater updated", theater: updatedTheater });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// Delete Theater
export const deleteTheaterController= async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Theater.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Theater not found" });
    }
    res.status(200).json({ message: "Theater deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed", error: error.message });
  }
};
