import mongoose from "mongoose";
import { SERVICE_CATEGORIES } from "../constants/serviceCategories.js";
import { CITIES } from "../constants/cities.js";
const serviceSchema = new mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  title: {
  type: String,
  required: true,
  trim: true,
},

  category: {
  type: String,
  required: true,
  enum: SERVICE_CATEGORIES,
},

   description: {
  type: String,
  required: true,
  trim: true,
  maxlength: 1000,
},

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    city: {
      type: String,
      required: true,
      enum: CITIES,
    },
// important
    location: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },

  coordinates: {
    type: [Number],
    default: [0, 0],
  },
},

    image: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

 serviceSchema.index({
  location: "2dsphere",
});

export default mongoose.model("Service", serviceSchema);