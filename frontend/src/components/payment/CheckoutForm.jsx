import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import Button from "../ui/Button";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,

      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#FCFCFA] border border-gray-200 rounded-3xl shadow-lg p-8 space-y-8"
    >

      <div>

        <h2 className="text-2xl font-bold text-[#2D2D2D]">
          Payment Details
        </h2>

        <p className="text-gray-500 mt-2">
          Your payment is securely processed by Stripe.
        </p>

      </div>

      <PaymentElement />

      <Button
        type="submit"
        loading={loading}
        className="w-full py-4 text-lg"
      >
        🔒 Pay Securely
      </Button>

    </form>
  );
}