import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getMyBookings } from "../../api/booking/bookingApi";

export default function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res.bookings);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F8FAF6]">
        <h2 className="text-2xl font-bold text-[#556B2F] animate-pulse">
          Loading Bookings...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">

      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2D2D2D]">
          My Bookings
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Track your service bookings and payment status.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-[#2D2D2D]">
            No Bookings Yet
          </h2>

          <p className="text-gray-500 mt-4">
            Book your first service and it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-8">

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-3xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 p-8"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">

                {/* Left */}

                <div className="flex-1">

                  <h2 className="text-3xl font-bold text-[#2D2D2D]">
                    {booking.service?.title}
                  </h2>

                  <div className="mt-5 space-y-3 text-gray-600">

                    <p>📅 <span className="font-medium">{new Date(booking.bookingDate).toLocaleDateString()}</span></p>

                    <p>🕐 <span className="font-medium">{booking.bookingTime}</span></p>

                    <p>📍 {booking.address}</p>

                    <p className="text-2xl font-bold text-[#556B2F]">
                      ₹ {booking.totalAmount}
                    </p>

                  </div>

                </div>

                {/* Right */}

                <div className="flex flex-col items-start lg:items-end gap-4">

                  <span
                    className={`px-5 py-2 rounded-full text-white font-semibold capitalize ${
                      booking.status === "accepted"
                        ? "bg-green-600"
                        : booking.status === "completed"
                        ? "bg-[#556B2F]"
                        : booking.status === "rejected"
                        ? "bg-red-600"
                        : booking.status === "cancelled"
                        ? "bg-gray-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {booking.status}
                  </span>

                  {booking.paymentStatus === "paid" ? (
                    <span className="bg-[#EEF4E7] text-[#556B2F] px-5 py-2 rounded-full font-bold">
                      ✅ Payment Completed
                    </span>
                  ) : (
                    <button
                      onClick={() =>
                        navigate(`/checkout/${booking._id}`)
                      }
                      className="w-full lg:w-auto px-8 py-3 rounded-2xl bg-[#556B2F] hover:bg-[#435625] text-white font-semibold transition-all"
                    >
                      💳 Pay Now
                    </button>
                  )}

                  {booking.status === "completed" && (
                    <button
                      onClick={() =>
                        navigate(`/review/${booking._id}`)
                      }
                      className="w-full lg:w-auto px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-all"
                    >
                      ⭐ Rate & Review
                    </button>
                  )}

                </div>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}