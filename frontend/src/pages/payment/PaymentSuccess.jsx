import { useEffect } from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import {
  verifyPayment,
} from "../../api/payment/paymentApi";

export default function PaymentSuccess() {
  const [params] = useSearchParams();

  useEffect(() => {
    const paymentIntent =
      params.get("payment_intent");

    if (!paymentIntent) return;

    const verify = async () => {
      try {
        await verifyPayment(paymentIntent);

        toast.success(
          "Payment Verified Successfully"
        );
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Payment Verification Failed"
        );
      }
    };

    verify();
  }, [params]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F8FAF6] px-6">

      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-12 text-center max-w-lg w-full">

        <div className="w-24 h-24 rounded-full bg-[#EEF4E7] flex items-center justify-center mx-auto mb-8">
          <span className="text-5xl">🎉</span>
        </div>

        <h2 className="text-4xl font-extrabold text-[#556B2F]">
          Payment Successful
        </h2>

        <p className="mt-5 text-gray-600 leading-7">
          Your payment has been completed successfully.
          Thank you for choosing ServiceHub.
        </p>

        <Link
          to="/bookings"
          className="inline-block mt-10 bg-[#556B2F] hover:bg-[#435625] text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300"
        >
          Back to My Bookings
        </Link>

      </div>

    </div>
  );
}