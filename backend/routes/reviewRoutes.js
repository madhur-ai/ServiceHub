import express from "express";

import {
  addReview,
  getReviews,
} from "../controllers/reviewController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer adds review
router.post(
  "/",
  protect,
  authorize("customer"),
  addReview
);

// Public reviews
router.get(
  "/:id",
  getReviews
);

export default router;