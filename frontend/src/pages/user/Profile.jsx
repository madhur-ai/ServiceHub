import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../api/auth/authApi";

import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import { CITIES } from "../../constants/cities";


export default function Profile() {
  const { user, updateUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    experience: 0,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        city: user.city || "",
        address: user.address || "",
        experience: user.experience || 0,
      });
    }
  }, [user]);

  if (!user) {
    return <Loader />;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await updateProfile(formData);

      updateUser(res.user);

      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#F8FAF6] py-10">
      <div className="max-w-5xl mx-auto px-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#435625] via-[#556B2F] to-[#6B8E23] rounded-3xl text-white p-10 shadow-xl">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white text-[#556B2F] flex items-center justify-center text-4xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                {user.name}
              </h1>

              <p className="mt-2 text-lg text-[#EEF4E7]">
                {user.role.toUpperCase()}
              </p>

              <p className="mt-1 text-[#EEF4E7]">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-lg mt-10 p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold">
            Edit Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              label="Email"
              value={user.email}
              disabled
            />

            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            {/* City */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                City
              </label>

              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-[#556B2F] focus:ring-2 focus:ring-[#DDE8D1]"
              >
                <option value="">Select City</option>

                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />

            {user.role === "provider" && (
              <Input
                label="Experience (Years)"
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            )}
          </div>

          {/* Account Details */}
          <div className="border-t pt-8">
            <h3 className="text-2xl font-bold mb-6">
              Account Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#F8FAF6] rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Account Type
                </p>

                <h4 className="font-bold text-lg capitalize mt-1">
                  {user.role}
                </h4>
              </div>

              <div className="bg-[#F8FAF6] rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Verification
                </p>

                <h4
                  className={`font-bold text-lg mt-1 ${
                    user.isVerified
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {user.isVerified
                    ? "Verified ✅"
                    : "Pending Verification"}
                </h4>
              </div>

              <div className="bg-[#F8FAF6] rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Member Since
                </p>

                <h4 className="font-bold text-lg mt-1">
                  {new Date(user.createdAt).toLocaleDateString()}
                </h4>
              </div>

              <div className="bg-[#F8FAF6] rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Email
                </p>

                <h4 className="font-bold text-lg mt-1 break-all">
                  {user.email}
                </h4>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button
              type="submit"
              loading={loading}
              className="w-full"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}