import express from "express";

import {

  createService,

  getServices,

  getSingleService,

  updateService,

  deleteService,

  getMyServices,

} from "../controllers/serviceController.js";

import {

  protect,

  authorize,

} from "../middleware/authMiddleware.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getServices);

router.get(

  "/provider/me",

  protect,

  authorize("provider"),

  getMyServices

);

router.get("/:id", getSingleService);

router.post(

  "/",

  protect,

  authorize("provider"),

  upload.single("image"),

  createService

);

router.put(

  "/:id",

  protect,

  authorize("provider"),

  upload.single("image"),

  updateService

);

router.delete(

  "/:id",

  protect,

  authorize("provider"),

  deleteService

);

export default router;