import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  ClipboardList,
  User,
  Wrench,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

import Loader from "../../components/ui/Loader";
import { getCustomerDashboard } from "../../api/dashboard/dashboardApi";

export default function CustomerDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getCustomerDashboard();
      setDashboard(res);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
    }
  };

  if (!dashboard) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAF6] py-10">

      <div className="max-w-7xl mx-auto px-6">

        

        <div className="bg-gradient-to-r from-[#435625] via-[#556B2F] to-[#6B8E23] rounded-3xl text-white p-10 shadow-xl">

          <h1 className="text-4xl font-extrabold">
            Welcome Back 👋
          </h1>

          <p className="mt-3 text-lg text-[#EEF4E7]">
            Book trusted professionals and manage your bookings easily.
          </p>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 mt-8 bg-white text-[#556B2F] font-semibold px-6 py-3 rounded-2xl hover:bg-[#EEF4E7] transition"
          >
            Browse Services
            <ArrowRight size={20} />
          </Link>

        </div>

        

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <div className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition">

            <ClipboardList
              size={40}
              className="mx-auto text-[#556B2F]"
            />

            <h2 className="text-4xl font-bold mt-4">
              {dashboard.totalBookings}
            </h2>

            <p className="text-gray-500 mt-2">
              Total Bookings
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition">

            <CalendarDays
              size={40}
              className="mx-auto text-[#556B2F]"
            />

            <h2 className="text-4xl font-bold mt-4">
              {dashboard.completedBookings}
            </h2>

            <p className="text-gray-500 mt-2">
              Completed
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition">

            <Wrench
              size={40}
              className="mx-auto text-[#556B2F]"
            />

            <h2 className="text-4xl font-bold mt-4">
              {dashboard.pendingBookings}
            </h2>

            <p className="text-gray-500 mt-2">
              Pending
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition">

            <User
              size={40}
              className="mx-auto text-[#556B2F]"
            />

            <h2 className="text-4xl font-bold mt-4">
              {dashboard.cancelledBookings}
            </h2>

            <p className="text-gray-500 mt-2">
              Cancelled
            </p>

          </div>

        </div>

        

        <div className="mt-14">

          <h2 className="text-3xl font-bold text-[#2D2D2D] mb-8">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <Link
              to="/services"
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition"
            >
              <Wrench
                size={45}
                className="text-[#556B2F]"
              />

              <h3 className="text-2xl font-bold mt-5">
                Browse Services
              </h3>

              <p className="mt-3 text-gray-500">
                Explore all available home services.
              </p>

            </Link>

            <Link
              to="/bookings"
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition"
            >
              <ClipboardList
                size={45}
                className="text-[#556B2F]"
              />

              <h3 className="text-2xl font-bold mt-5">
                My Bookings
              </h3>

              <p className="mt-3 text-gray-500">
                Track all your service bookings.
              </p>

            </Link>

            <Link
              to="/profile"
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition"
            >
              <User
                size={45}
                className="text-[#556B2F]"
              />

              <h3 className="text-2xl font-bold mt-5">
                My Profile
              </h3>

              <p className="mt-3 text-gray-500">
                Update your personal information.
              </p>

            </Link>

          </div>

        </div>

        

        <div className="mt-16 bg-white rounded-3xl shadow-md p-8">

          <h2 className="text-3xl font-bold text-[#2D2D2D]">
            Recent Activity
          </h2>

          <div className="mt-6 space-y-5">

            {dashboard.recentBookings.length === 0 ? (

              <div className="text-center py-8">

                <p className="text-gray-500">
                  No recent bookings found.
                </p>

              </div>

            ) : (

              dashboard.recentBookings.map((booking) => (

                <div
                  key={booking._id}
                  className="flex justify-between items-center border-b pb-5"
                >

                  <div>

                    <h3 className="font-semibold text-lg">
                      {booking.service?.title}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      {new Date(
                        booking.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                      booking.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {booking.status}
                  </span>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}