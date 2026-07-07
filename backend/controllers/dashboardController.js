import Booking from "../models/Booking.js";

export const customerDashboard = async (req, res) => {
  try {
    const customerId = req.user._id;

    const bookings = await Booking.find({
      customer: customerId,
    });

    const totalBookings = bookings.length;

    const pendingBookings = bookings.filter(
      (booking) =>
        booking.status === "pending"
    ).length;

    const completedBookings = bookings.filter(
      (booking) =>
        booking.status === "completed"
    ).length;

    const cancelledBookings = bookings.filter(
      (booking) =>
        booking.status === "cancelled"
    ).length;

    const recentBookings = await Booking.find({
      customer: customerId,
    })
      .populate("service")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      totalBookings,
      pendingBookings,
      completedBookings,
      cancelledBookings,
      recentBookings,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};