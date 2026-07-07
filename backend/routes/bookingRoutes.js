import express from "express";

import { bookService,  getMyBookings,getProviderBookingsList,changeBookingStatus } from "../controllers/bookingController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("customer"),
  bookService
);
router.get(
  "/my",
  protect,
  authorize("customer"),
  getMyBookings
);

// Provider Bookings
router.get(
  "/provider",
  protect,
  authorize("provider"),
  getProviderBookingsList
);

// Update Booking Status
router.put(
  "/:id",
  protect,
  authorize("provider"),
  changeBookingStatus
);

export default router;