import Review from "../models/Review.js";

export const createReview = async (
  reviewData
) => {
  return await Review.create(reviewData);
};

export const getServiceReviews = async (
  serviceId
) => {
  return await Review.find({
    service: serviceId,
  })
    .populate(
      "customer",
      "name profileImage"
    )
    .sort({
      createdAt: -1,
    });
};