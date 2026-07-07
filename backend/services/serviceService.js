import Service from "../models/Service.js";

export const createNewService = async (
  serviceData
) => {

  return await Service.create(
    serviceData
  );

};

export const getAllServices =
  async () => {

    return await Service.find()
      .populate(
        "provider",
        "name email phone city"
      );

};

export const getProviderServices =
  async (providerId) => {

    return await Service.find({

      provider: providerId,

    }).sort({

      createdAt: -1,

    });

};

export const getServiceById =
  async (id) => {

    return await Service.findById(id)
      .populate(
        "provider",
        "name email phone city profileImage"
      );

};

export const updateServiceById =
  async (
    id,
    data
  ) => {

    return await Service.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

};

export const deleteServiceById =
  async (id) => {

    return await Service.findByIdAndDelete(
      id
    );

};