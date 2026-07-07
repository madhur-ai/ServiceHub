import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import { getService } from "../../api/service/serviceApi";
import ReviewList from "../../components/review/ReviewList";

export default function ServiceDetails() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
const navigate = useNavigate();

  useEffect(() => {
    loadService();
  }, []);

  const loadService = async () => {
    try {
      const res = await getService(id);
      setService(res.service);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load service"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F8FAF6]">
        <h2 className="text-2xl font-bold text-[#556B2F] animate-pulse">
          Loading Service...
        </h2>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-4xl font-bold text-red-500">
          Service Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-14 px-6">

      <div className="grid lg:grid-cols-2 gap-14 items-start">

        

        <div className="overflow-hidden rounded-3xl shadow-2xl">
          <img
  src={
    service.image && service.image.trim() !== ""
      ? service.image
      : "/images/default-service.jpg"
  }
  alt={service.title}
  className="w-full h-[500px] object-cover hover:scale-105 transition duration-500"
  onError={(e) => {
    e.target.src = "/images/default-service.jpg";
  }}
/>
        </div>

        

        <div>

          <span className="inline-block bg-[#EEF4E7] text-[#556B2F] px-4 py-2 rounded-full font-semibold">
            {service.category}
          </span>

          <h1 className="text-5xl font-extrabold mt-5 text-[#2D2D2D]">
            {service.title}
          </h1>

          <h2 className="text-4xl font-bold text-[#556B2F] mt-6">
            ₹ {service.price}
          </h2>

          <div className="mt-8 space-y-4 text-lg">

            <p>
              📍 <span className="font-semibold">City:</span>{" "}
              {service.city}
            </p>

            <p>
              {service.isAvailable ? "🟢" : "🔴"}{" "}
              <span className="font-semibold">
                Availability:
              </span>{" "}
              {service.isAvailable
                ? "Available"
                : "Unavailable"}
            </p>

            <p>
              ⭐ <span className="font-semibold">Rating:</span>{" "}
              {service.rating}
            </p>

            <p>
              💬 <span className="font-semibold">Reviews:</span>{" "}
              {service.totalReviews}
            </p>

          </div>

          <div className="mt-10">

            <h3 className="text-2xl font-bold text-[#2D2D2D] mb-4">
              Description
            </h3>

            <p className="text-gray-600 leading-8 text-lg">
              {service.description}
            </p>

          </div>

          <div className="mt-12">

            <Button
  className="w-full py-4 text-lg rounded-2xl"

  onClick={() => {

  if (!user) {
    navigate("/login");
    return;
  }

  if (user.role !== "customer") {
    toast.error("Only customers can book services.");
    return;
  }

  navigate(`/book/${service._id}`);

}}
>
  Book This Service
</Button>

          </div>

        </div>

      </div>

      

      <div className="mt-20">

        <h2 className="text-3xl font-bold mb-8 text-[#2D2D2D]">
          Customer Reviews
        </h2>

        <ReviewList serviceId={service._id} />

      </div>

    </div>
  );
}