import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  CalendarDays,
  User,
  Phone,
  MapPin,
  Clock3,
  IndianRupee,
} from "lucide-react";

import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";

import {
  getProviderBookings,
  updateBookingStatus,
} from "../../api/booking/bookingApi";

export default function ProviderBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await getProviderBookings();
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

  const changeStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);

      toast.success(
        `Booking ${status} successfully`
      );

      loadBookings();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAF6] py-10">

      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-10">

          <h1 className="text-4xl font-extrabold text-[#2D2D2D]">
            Booking Requests
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all customer booking requests.
          </p>

        </div>

        {bookings.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-14 text-center">

            <h2 className="text-3xl font-bold">
              No Booking Requests
            </h2>

            <p className="text-gray-500 mt-4">
              New customer bookings will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-8">

            {bookings.map((booking) => (

              <div
                key={booking._id}
                className="bg-white rounded-3xl shadow-md p-8 border border-gray-200"
              >

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

                  <div>

                    <h2 className="text-3xl font-bold text-[#2D2D2D]">
                      {booking.service?.title}
                    </h2>

                    <div className="mt-6 space-y-3">

                      <p className="flex items-center gap-2">
                        <User size={18} />
                        {booking.customer?.name}
                      </p>

                      <p className="flex items-center gap-2">
                        <Phone size={18} />
                        {booking.customer?.phone}
                      </p>

                      <p className="flex items-center gap-2">
                        <CalendarDays size={18} />
                        {new Date(
                          booking.bookingDate
                        ).toLocaleDateString()}
                      </p>

                      <p className="flex items-center gap-2">
                        <Clock3 size={18} />
                        {booking.bookingTime}
                      </p>

                      <p className="flex items-center gap-2">
                        <MapPin size={18} />
                        {booking.address}
                      </p>

                      <p className="flex items-center gap-2 font-bold text-[#556B2F]">
                        <IndianRupee size={18} />
                        {booking.totalAmount}
                      </p>

                    </div>

                  </div>

                  <div>

                    <span
                      className={`px-5 py-2 rounded-full font-semibold capitalize ${
                        booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : booking.status === "accepted"
                          ? "bg-blue-100 text-blue-700"
                          : booking.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>

                  </div>

                </div>

                <div className="mt-8 flex flex-wrap gap-4">

                  {booking.status === "pending" && (
                    <>
                      <Button
                        onClick={() =>
                          changeStatus(
                            booking._id,
                            "accepted"
                          )
                        }
                      >
                        Accept
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() =>
                          changeStatus(
                            booking._id,
                            "rejected"
                          )
                        }
                      >
                        Reject
                      </Button>
                    </>
                  )}

                  {booking.status === "accepted" && (
                    <Button
                      onClick={() =>
                        changeStatus(
                          booking._id,
                          "completed"
                        )
                      }
                    >
                      Complete Job
                    </Button>
                  )}

                  {booking.status === "completed" && (
                    <span className="px-5 py-3 rounded-xl bg-green-100 text-green-700 font-semibold">
                      ✅ Job Completed
                    </span>
                  )}

                  {booking.status === "rejected" && (
                    <span className="px-5 py-3 rounded-xl bg-red-100 text-red-700 font-semibold">
                      ❌ Booking Rejected
                    </span>
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}