import API from "../axios";


export const addReview = async (reviewData) => {
  const response = await API.post(
    "/reviews",
    reviewData
  );

  return response.data;
};


export const getServiceReviews = async (
  serviceId
) => {
  const response = await API.get(
    `/reviews/${serviceId}`
  );

  return response.data;
};