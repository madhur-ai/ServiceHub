import Booking from "../models/Booking.js";

export const createBooking = async (
  bookingData
) => {
  return await Booking.create(bookingData);
};

export const getCustomerBookings = async (
  customerId
) => {
  return await Booking.find({
    customer: customerId,
  })
    .populate("service")
    .populate("provider", "name phone")
    .sort({ createdAt: -1 });
};

export const getProviderBookings = async (
  providerId
) => {
  return await Booking.find({
    provider: providerId,
  })
    .populate("service")
    .populate("customer", "name phone")
    .sort({ createdAt: -1 });
};

export const updateBookingStatus =
  async (id, status) => {
    return await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  };