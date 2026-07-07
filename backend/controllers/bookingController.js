import Service from "../models/Service.js";
import {
  createBooking,
  getCustomerBookings,
  getProviderBookings,
  updateBookingStatus,
} from "../services/bookingService.js";

export const bookService = async (
  req,
  res
) => {
  try {
    const service = await Service.findById(
      req.body.service
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service Not Found",
      });
    }

    const booking =
      await createBooking({
        customer: req.user._id,
        provider: service.provider,
        service: service._id,

        bookingDate:
          req.body.bookingDate,

        bookingTime:
          req.body.bookingTime,

        address: req.body.address,

        notes: req.body.notes,

        totalAmount: service.price,
      });

    res.status(201).json({
      success: true,
      booking,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ===============================
// Get Customer Bookings
// ===============================

export const getMyBookings = async (
  req,
  res
) => {
  try {
    const bookings =
      await getCustomerBookings(req.user._id);

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Provider Bookings
// ===============================

export const getProviderBookingsList = async (
  req,
  res
) => {
  try {
    const bookings =
      await getProviderBookings(req.user._id);

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Booking Status
// ===============================

export const changeBookingStatus = async (
  req,
  res
) => {
  try {
    const booking =
      await updateBookingStatus(
        req.params.id,
        req.body.status
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};