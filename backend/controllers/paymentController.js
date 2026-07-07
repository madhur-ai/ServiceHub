import stripe from "../config/stripe.js";
import Booking from "../models/Booking.js";

// ======================================
// Create Payment Intent
// ======================================

export const createPaymentIntent = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    // Prevent duplicate payment
    if (booking.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Booking already paid.",
      });
    }

    const paymentIntent =
      await stripe.paymentIntents.create({
        amount: booking.totalAmount * 100,
        currency: "inr",

        automatic_payment_methods: {
          enabled: true,
        },

        metadata: {
          bookingId: booking._id.toString(),
        },
      });

    booking.paymentIntentId = paymentIntent.id;
    await booking.save();

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const verifyPayment = async (req, res) => {
    console.log("===== VERIFY PAYMENT =====");
  console.log(req.body);
  try {

    const { paymentIntentId } = req.body;

    const paymentIntent =
      await stripe.paymentIntents.retrieve(
        paymentIntentId
      );
      console.log("Stripe Payment Intent:");
console.log(paymentIntent);
console.log("Stripe Status:", paymentIntent.status);

if (paymentIntent.status !== "succeeded") {
  return res.status(400).json({
    success: false,
    message: "Payment Not Successful",
  });
}

console.log(
  "Booking Id From Stripe:",
  paymentIntent.metadata.bookingId
);

const booking = await Booking.findById(
  paymentIntent.metadata.bookingId
);

if (!booking) {
  return res.status(404).json({
    success: false,
    message: "Booking Not Found",
  });
}

console.log("Before Update:", booking.paymentStatus);

booking.paymentStatus = "paid";

await booking.save();

console.log("After Update:", booking.paymentStatus);

return res.status(200).json({
  success: true,
  booking,
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



