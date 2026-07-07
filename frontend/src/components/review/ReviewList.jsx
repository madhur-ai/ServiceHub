import { useEffect, useState } from "react";
import {
  getServiceReviews,
} from "../../api/review/reviewApi";

export default function ReviewList({
  serviceId,
}) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const res =
      await getServiceReviews(serviceId);

    setReviews(res.reviews);
  };

  return (
    <div className="space-y-8">

      {reviews.length === 0 ? (
        <div className="bg-[#FCFCFA] border border-gray-200 rounded-3xl p-10 text-center">

          <h2 className="text-2xl font-bold text-[#2D2D2D]">
            No Reviews Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Be the first customer to review this service.
          </p>

        </div>
      ) : (
        <>
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-8"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-xl font-bold text-[#2D2D2D]">
                    {review.customer?.name}
                  </h3>

                  <p className="text-amber-500 mt-2 text-lg">
                    {"⭐".repeat(review.rating)}
                  </p>

                </div>

              </div>

              <p className="mt-5 text-gray-600 leading-8">
                {review.comment}
              </p>

            </div>
          ))}
        </>
      )}

    </div>
  );
}