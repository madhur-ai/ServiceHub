import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

import {
  createNewService,
  getAllServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
  getProviderServices,
} from "../services/serviceService.js";



const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ServiceHub",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};


export const createService = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const uploadedImage = await uploadToCloudinary(req.file.buffer);

      imageUrl = uploadedImage.secure_url;
    }

    const service = await createNewService({
      ...req.body,
      provider: req.user._id,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Service Created Successfully",
      service,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getServices = async (req, res) => {
  try {
    const services = await getAllServices();

    res.json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getMyServices = async (req, res) => {
  try {
    const services = await getProviderServices(req.user._id);

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getSingleService = async (req, res) => {
  try {
    const service = await getServiceById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service Not Found",
      });
    }

    res.json({
      success: true,
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateService = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
    };

    if (req.file) {
      const uploadedImage = await uploadToCloudinary(req.file.buffer);

      updatedData.image = uploadedImage.secure_url;
    }

    const service = await updateServiceById(
      req.params.id,
      updatedData
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service Not Found",
      });
    }

    res.json({
      success: true,
      message: "Service Updated Successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const deleteService = async (req, res) => {
  try {
    const service = await deleteServiceById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service Not Found",
      });
    }

    res.json({
      success: true,
      message: "Service Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};