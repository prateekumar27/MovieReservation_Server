import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authCheck = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const token = authHeader.split(" ")[1]; // ✅ Now token is defined

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({
      message: "Unauthorized - token verification failed",
      error: error.message,
      redirectUrl: "http://localhost:5173/login",
    });
  }
};

export default authCheck;
