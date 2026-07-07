import API from "../axios";

export const getCustomerDashboard = async () => {
  const response = await API.get(
    "/dashboard/customer"
  );

  return response.data;
};