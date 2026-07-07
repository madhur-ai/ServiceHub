import API from "../axios";


export const createPaymentIntent = async (
  bookingId
) => {
  const response = await API.post(
    "/payment/create-payment-intent",
    {
      bookingId,
    }
  );

  return response.data;
};


export const verifyPayment = async (
  paymentIntentId
) => {

  const response = await API.post(
    "/payment/verify",
    {
      paymentIntentId,
    }
  );

  return response.data;
};