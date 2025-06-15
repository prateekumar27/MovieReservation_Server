import mongoose from "mongoose";
import express from "express";

const server = express();

server.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/populate");
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to database", error.message);
  }
};

connectDB();

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
});

const Product = mongoose.model("Product", productSchema);

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const User = mongoose.model("User", UserSchema);

//api endpoints
server.post("/adduser", async (req, res) => {
  const users = new User(req.body);
  try {
    await users.save();
    res.status(201).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

server.post("/addproduct", async (req, res) => {
  const products = new Product(req.body);
  try {
    await products.save();
    res.status(201).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

//purchase

server.post("/purchase/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    user.products.push(product);
    await user.save();
    res.status(200).send("Product purchased successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

//get all products for a user
server.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params
    const users = await User.findById(id).populate("products");
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

server.listen(3002, () => {
  console.log("Server started on port 3002");
});
