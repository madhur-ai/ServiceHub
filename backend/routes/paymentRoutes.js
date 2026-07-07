import express from "express";

import {
  createPaymentIntent,
  verifyPayment,
} from "../controllers/paymentController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-payment-intent",
  protect,
  authorize("customer"),
  createPaymentIntent
);

router.post(
  "/verify",
  protect,
  authorize("customer"),
  verifyPayment
);

export default router;