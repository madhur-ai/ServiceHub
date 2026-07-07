import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "../ui/Button";

import { addReview } from "../../api/review/reviewApi";

export default function ReviewForm({
  bookingId,
  onSuccess,
}) {
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addReview({
        booking: bookingId,
        rating: Number(data.rating),
        comment: data.comment,
      });

      toast.success("Review Added");

      onSuccess();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#FCFCFA] border border-gray-200 rounded-3xl shadow-lg p-8 space-y-6"
    >

      <div>

        <h2 className="text-2xl font-bold text-[#2D2D2D]">
          Share Your Experience
        </h2>

        <p className="text-gray-500 mt-2">
          Your review helps other customers.
        </p>

      </div>

      <select
        className="w-full rounded-2xl border border-gray-300 px-5 py-3 outline-none focus:border-[#556B2F] focus:ring-2 focus:ring-[#DDE8D1]"
        {...register("rating")}
      >
        <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
        <option value="4">⭐⭐⭐⭐ Very Good</option>
        <option value="3">⭐⭐⭐ Good</option>
        <option value="2">⭐⭐ Fair</option>
        <option value="1">⭐ Poor</option>
      </select>

      <textarea
        rows={5}
        placeholder="Tell us about your experience..."
        className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none resize-none focus:border-[#556B2F] focus:ring-2 focus:ring-[#DDE8D1]"
        {...register("comment")}
      />

      <Button
        type="submit"
        className="w-full py-4"
      >
        Submit Review
      </Button>

    </form>
  );
}