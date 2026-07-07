import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate,useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import Input from "../ui/Input";

import { CITIES } from "../../constants/cities";
import { CATEGORIES } from "../../constants/categories";

import {
  createService,
  updateService,
} from "../../api/service/serviceApi";

export default function ServiceForm({ isEdit = false }) {

  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isAvailable: true,
    },
  });

 const onSubmit = async (data) => {
  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("city", data.city);
    formData.append("description", data.description);
    formData.append(
      "isAvailable",
      data.isAvailable
    );

    if (data.image && data.image.length > 0) {
      formData.append(
        "image",
        data.image[0]
      );
    }

    if (isEdit) {
      await updateService(id, formData);

      toast.success("Service Updated Successfully");
    } else {
      await createService(formData);

      toast.success("Service Created Successfully");
    }

    navigate("/provider");

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      (isEdit
        ? "Failed to update service"
        : "Failed to create service")
    );

  } finally {

    setLoading(false);

  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >

      <div className="mb-8">
  <h2 className="text-3xl font-extrabold text-[#2D2D2D]">
    {isEdit ? "Update Service" : "Create New Service"}
  </h2>

  <p className="text-gray-500 mt-2">
    Fill in the details below to make your service available for customers.
  </p>
</div>

     

      <Input
        label="Service Title"
        placeholder="Example : AC Repair"
        error={errors.title?.message}
        {...register("title", {
          required: "Title is required",
        })}
      />

      

      <div className="space-y-2">

        <label className="font-semibold text-gray-700">
          Category
        </label>

        <select
          {...register("category", {
            required: "Category is required",
          })}
                className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-3 outline-none transition-all duration-300 focus:border-[#556B2F] focus:ring-2 focus:ring-[#DDE8D1]"        >
          <option value="">
            Select Category
          </option>

          {CATEGORIES.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}

        </select>

        {errors.category && (
          <p className="text-red-500 text-sm">
            {errors.category.message}
          </p>
        )}

      </div>

      {/* Price */}

      <Input
        label="Price (₹)"
        type="number"
        placeholder="499"
        error={errors.price?.message}
        {...register("price", {
          required: "Price is required",
          min: {
            value: 1,
            message:
              "Price must be greater than 0",
          },
        })}
      />

      

      <div className="space-y-2">

        <label className="font-semibold text-gray-700">
          City
        </label>

        <select
          {...register("city", {
            required: "City is required",
          })}
className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-3 outline-none transition-all duration-300 focus:border-[#556B2F] focus:ring-2 focus:ring-[#DDE8D1]"        >
          <option value="">
            Select City
          </option>

          {CITIES.map((city) => (
            <option
              key={city}
              value={city}
            >
              {city}
            </option>
          ))}

        </select>

        {errors.city && (
          <p className="text-red-500 text-sm">
            {errors.city.message}
          </p>
        )}

      </div>

      

      <div className="space-y-2">

        <label className="font-semibold text-gray-700">
          Description
        </label>

        <textarea
          rows="5"
          placeholder="Describe your service..."
className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-3 outline-none transition-all duration-300 focus:border-[#556B2F] focus:ring-2 focus:ring-[#DDE8D1]"          {...register("description", {
            required:
              "Description is required",
            minLength: {
              value: 20,
              message:
                "Description should contain at least 20 characters",
            },
          })}
        />

        {errors.description && (
          <p className="text-red-500 text-sm">
            {errors.description.message}
          </p>
        )}

      </div>

      

<div className="space-y-2">

  <label className="font-semibold text-gray-700">
    Service Image
  </label>

  <input
    type="file"
    accept="image/*"
    {...register("image")}
    className="w-full rounded-xl border border-gray-300 p-3"
  />

</div>
      
      

<div className="flex items-center justify-between border border-gray-200 rounded-2xl bg-[#FCFCFA] p-5 shadow-sm">
        <div>

          <h3 className="font-semibold">
            Available
          </h3>

          <p className="text-sm text-gray-500">
            Customers can book this service.
          </p>

        </div>

        <input
          type="checkbox"
className="w-5 h-5 accent-[#556B2F]"
          {...register("isAvailable")}
        />

      </div>

      

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
         {isEdit ? "Update Service" : "Create Service"}
      </Button>

    </form>
  );
}