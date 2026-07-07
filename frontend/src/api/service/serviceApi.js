import API from "../axios";


export const createService = async (serviceData) => {
  const response = await API.post(
    "/services",
    serviceData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


export const getAllServices = async () => {
  const response = await API.get("/services");
  return response.data;
};


export const getService = async (id) => {
  const response = await API.get(`/services/${id}`);
  return response.data;
};


export const getMyServices = async () => {
  const response = await API.get(
    "/services/provider/me"
  );

  return response.data;
};


export const updateService = async (
  id,
  serviceData
) => {
  const response = await API.put(
    `/services/${id}`,
    serviceData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


export const deleteService = async (id) => {
  const response = await API.delete(
    `/services/${id}`
  );

  return response.data;
};