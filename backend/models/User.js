

import mongoose from "mongoose";

import { ROLES } from "../constants/roles.js";
import { CITIES } from "../constants/cities.js";

const userSchema = new mongoose.Schema(
  {
    //basic info

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
       match: [
    /^[6-9]\d{9}$/,
    "Please enter a valid Indian mobile number",
  ],
    },

    profileImage: {
      type: String,
      default: "",
    },

   

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.CUSTOMER,
    },

   
    city: {
      type: String,
      enum: CITIES,
      required: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

   

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        default: [0, 0], // [longitude, latitude]
      },
    },

    

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/*

MongoDB Geospatial Index

*/

userSchema.index({
  location: "2dsphere",
});

export default mongoose.model("User", userSchema);