import axios from "axios";
import { getAccessToken } from "../utils/payment.Handler.js";

const PAYPAL_API = "https://api-m.sandbox.paypal.com";

export const createPaypalOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const accessToken = await getAccessToken();

    const order = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [{ amount: { currency_code: "USD", value: amount } }],
        application_context: {
          return_url: "http://localhost:5173/paypal-success",
          cancel_url: "http://localhost:5173/paypal-cancel",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(order.data);
  } catch (error) {
    console.error("Create Order Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const capturePaypalOrder = async (req, res) => {
  try {
    const { orderID } = req.body;
    const accessToken = await getAccessToken();

    const capture = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(capture.data);
  } catch (error) {
    console.error("Capture Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
