import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import Review from "../models/Review.js";

import {
  createReview,
  getServiceReviews,
} from "../services/reviewService.js";

export const addReview = async (
  req,
  res
) => {
  try {

    const booking =
      await Booking.findById(
        req.body.booking
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    const review =
      await createReview({

        booking: booking._id,

        customer: req.user._id,

        provider: booking.provider,

        service: booking.service,

        rating: req.body.rating,

        comment: req.body.comment,

      });
      // =====================================
// Update Service Rating
// =====================================


const reviews = await Review.find({
  service: booking.service,
});

const totalReviews = reviews.length;

const averageRating =
  reviews.reduce(
    (sum, item) => sum + item.rating,
    0
  ) / totalReviews;

await Service.findByIdAndUpdate(
  booking.service,
  {
    rating: averageRating,
    totalReviews,
  }
);


    res.status(201).json({
      success: true,
      review,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getReviews =
  async (req, res) => {

    try {

      const reviews =
        await getServiceReviews(
          req.params.id
        );

      res.status(200).json({
        success: true,
        reviews,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };
  