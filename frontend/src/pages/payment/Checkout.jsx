import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../../components/payment/CheckoutForm";
import { createPaymentIntent } from "../../api/payment/paymentApi";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

export default function Checkout() {
  const { bookingId } = useParams();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPayment = async () => {
      try {
        const res = await createPaymentIntent(bookingId);
        setClientSecret(res.clientSecret);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadPayment();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F8FAF6]">
        <h1 className="text-3xl font-bold text-[#556B2F] animate-pulse">
          Preparing Secure Payment...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF6] py-16 px-6">

      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 p-10">

        <h1 className="text-4xl font-extrabold text-center text-[#2D2D2D]">
          Secure Checkout
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-8">
          Complete your payment securely using Stripe.
        </p>

        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <CheckoutForm />
          </Elements>
        )}

      </div>

    </div>
  );
}