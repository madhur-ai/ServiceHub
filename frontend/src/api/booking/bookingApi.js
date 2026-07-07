import API from "../axios";


export const createBooking = async (bookingData) => {
  const response = await API.post(
    "/bookings",
    bookingData
  );

  return response.data;
};


export const getMyBookings = async () => {
  const response = await API.get(
    "/bookings/my"
  );

  return response.data;
};


export const getProviderBookings = async () => {
  const response = await API.get(
    "/bookings/provider"
  );

  return response.data;
};

// Update Status
export const updateBookingStatus = async (
  id,
  status
) => {
  const response = await API.put(
    `/bookings/${id}`,
    { status }
  );

  return response.data;
};