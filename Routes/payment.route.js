import express from "express";
import {
  createPaypalOrder,
  capturePaypalOrder,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-order", createPaypalOrder);
router.post("/capture-order", capturePaypalOrder);

export default router;
