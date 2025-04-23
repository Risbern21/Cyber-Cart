import express from "express";
const router = express.Router();

import { createOrder, verifyPayment } from "../controllers/payments.controller.js";

import { getCartById } from "../controllers/cart.controller.js";

router.post("/createOrder", createOrder);
router.post("/verifyPayment", verifyPayment);
router.post("/getCartById", getCartById);

export default router;