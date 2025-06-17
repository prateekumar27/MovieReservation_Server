import express from "express";
import cors from "cors";
import { Routes } from "./Routes/user.route.js";
import { adminRouter } from "./Routes/admin.route.js";
import { movieRouter } from "./Routes/movie.route.js";
import env from "dotenv";
import dbconnect from "./Database/dbconnect.js";
import cookieParser from "cookie-parser";
import { bookingRouter } from "./Routes/booking.route.js";
import { theaterRoutes } from "./Routes/theater.route.js";
import paypalRouter from "./Routes/payment.route.js";

env.config(); //Load environment variables

//Create the server
const server = express();
const PORT = process.env.PORT;

//Middleware to parse cookies
server.use(cookieParser());

//Middleware to enable JSON and CORS requests
server.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://cinemmax.vercel.app",
        "http://localhost:5173",
      ];
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },

    exposedHeaders: ["Authorization"],
  })
);
server.use(express.json());

//Middleware to use the routes
server.get("/", (req, res) => {
  res.status(200).send("Movie Reservation Backend is running ");
});

server.use("/api", Routes);
server.use("/api/admin", adminRouter);
server.use("/api/movie", movieRouter);
server.use("/api/booking", bookingRouter);
server.use("/api/theater", theaterRoutes);
server.use("/api/paypal", paypalRouter);

// //Middleware to handle options requests
// server.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
//   res.setHeader("Access-Control-Expose-Headers", " Authorization");
//   next();
// });

//Middleware to handle errors
server.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal server error" });
  console.log(err.message);
});

//Connect to the database
(async () => {
  try {
    await dbconnect();
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error", error.message);
  }
})();
