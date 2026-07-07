import express from "express";

import {
  registerUser,
  loginUser,
   getCurrentUser,
   updateProfile,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/*

        Authentication Routes

*/

router.post("/register", registerUser);

// Login User
// POST /api/auth/login
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.put("/profile",protect, updateProfile);
  
  
 


export default router;

