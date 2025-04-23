import crypto from "crypto";
import { createRazorpayInstance } from "../config/razorpay.config.js";
import dotenv from "dotenv";

const razorpayInstance = createRazorpayInstance();

dotenv.config();

export const createOrder = async (req, res) => {
  const { cart_id } = req.body;

  // fetch product amount

  const options = {
    amount: 100 * 100,
    currency: "INR",
    receipt: "receipt_order_1",
  };

  try {
    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "something went wrong",
        });
      }
      return res.status(200).json(order);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export const verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;

  const hmac = crypto.createHmac("sha256", secret);

  hmac.update(order_id + "|" + payment_id);

  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === signature) {
    return res.status(200).json({
      success: true,
      message: "payment verified",
    });
  }
  return res.status(400).json({
    success: false,
    message: "payment not verified",
  });
};
