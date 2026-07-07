import mongoose from "mongoose";
import { BOOKING_STATUS } from "../constants/bookingStatus.js";

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    bookingTime: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
enum: [
        "pending",
        "accepted",
        "completed",
        "cancelled",
        "rejected",
      ],
            default: BOOKING_STATUS.PENDING,
    },
    
      paymentStatus: {
  type: String,
  enum: ["pending", "paid"],
  default: "pending",
},

paymentIntentId: {
  type: String,
  default: "",
},

  },
  
  {
  
    timestamps: true,
  }
  
);

export default mongoose.model("Booking", bookingSchema);