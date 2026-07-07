import express from "express";

import { customerDashboard } from "../controllers/dashboardController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/customer",
  protect,
  authorize("customer"),
  customerDashboard
);

export default router;