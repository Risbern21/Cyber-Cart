import crypto from "crypto";
import { createRazorpayInstance } from "../config/razorpay.config.js";
import dotenv from "dotenv";
import pool from "../config/db.js";
import { getCartById } from "./cart.controller.js";
import { getCartByIdSerivce } from "../models/cartModels.js";

const razorpayInstance = createRazorpayInstance();

dotenv.config();

export const createOrder = async (req, res) => {
  const { cart_id } = req.body;

  // fetch product amount
  const cartData = await getCartByIdSerivce(cart_id);

  // console.log(cartData);

  if (!cartData.sum)
    return res.status(404).json({
      success: false,
      message: "cart not found",
    });

  const options = {
    amount: cartData.sum,
    currency: "INR",
    receipt: "receipt_order_1",
  };

  try {
    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({
          success: false,
          // message: "something went err",
          data: err,
        });
      }
      // console.log(order);
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
  const {
    order_id,
    payment_id,
    signature,
    cart_id,
    customer_id,
    name,
    email,
    address,
  } = req.body;

  // console.log(order_id, "   ", payment_id, "    ", signature);

  const secret = process.env.RAZORPAY_KEY_SECRET;

  const hmac = crypto.createHmac("sha256", secret);

  hmac.update(order_id + "|" + payment_id);

  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === signature) {
    try {
      const queryText = `UPDATE cart SET "isPaid" = true WHERE cart_id = $1 RETURNING *`;

      const result = await pool.query(queryText, [cart_id]);

      // console.log(result);

      return res.status(200).json({
        success: true,
        message: "payment successfull",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    }
  }
  return res.status(400).json({
    success: false,
    message: "payment not verified",
  });
};
