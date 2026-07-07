import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { CITIES } from "../../constants/cities";
import {
  registerUser,
  loginUser,
} from "../../api/auth/authApi";

import { useAuth } from "../../context/AuthContext";

import Button from "../ui/Button";
import Input from "../ui/Input";
import PasswordInput from "./PasswordInput";
import RoleSelector from "./RoleSelector";

export default function AuthForm({ type }) {
  const isLogin = type === "login";

  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "customer",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      let res;

      if (isLogin) {
        res = await loginUser({
          email: data.email,
          password: data.password,
        });

        login(res.user, res.token);

        toast.success("Login Successful");
      } else {
        res = await registerUser(data);

        login(res.user, res.token);

        toast.success("Registration Successful");
      }

      if (res.user.role === "provider") {
        navigate("/provider");
      } else {
        navigate("/customer");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="w-full max-w-lg rounded-[32px] bg-[#FCFCFA] border border-gray-200 shadow-2xl p-10">   
<h1 className="text-4xl font-extrabold text-center text-[#2D2D2D]">        {isLogin ? "Welcome Back 👋" : "Create Account"}
      </h1>

<p className="text-center text-gray-500 mt-3 text-lg leading-7">
          {isLogin
          ? "Login to continue"
          : "Register to start booking services"}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 mt-10"
      >
        {!isLogin && (
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.name?.message}
            {...register("name", {
              required: "Name is required",
            })}
          />
        )}

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter password"
          register={register}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message:
                "Password must be at least 6 characters",
            },
          }}
          error={errors.password}
        />

        {!isLogin && (
          <>
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm password"
              register={register}
              name="confirmPassword"
              rules={{
                required: "Confirm password is required",
                validate: (value) =>
                  value === password ||
                  "Passwords do not match",
              }}
              error={errors.confirmPassword}
            />
            <Input
  label="Phone Number"
  placeholder="Enter your phone number"
  error={errors.phone?.message}
  {...register("phone", {
    required: "Phone number is required",
  })}
/>

<div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-700">
    City
  </label>

  <select
    {...register("city", {
      required: "City is required",
    })}
     className="w-full rounded-2xl border border-gray-300 px-5 py-3 outline-none transition-all duration-300 focus:border-[#556B2F] focus:ring-2 focus:ring-[#DDE8D1]"  >
    <option value="">Select City</option>

    {CITIES.map((city) => (
      <option key={city} value={city}>
        {city}
      </option>
    ))}
  </select>

  {errors.city && (
    <p className="text-sm text-red-500">
      {errors.city.message}
    </p>
  )}
</div>

            <RoleSelector
              register={register}
              error={errors.role}
            />
          </>
        )}

        {isLogin && (
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-[#556B2F]"              />
              Remember me
            </label>

            <button
              type="button"
className="text-[#556B2F] font-medium hover:underline"            >
              Forgot Password?
            </button>
          </div>
        )}

        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          {isLogin ? "Login" : "Register"}
        </Button>
      </form>

<div className="mt-10 text-center text-sm text-gray-600">
          {isLogin ? (
          <>
            Don't have an account?{" "}
            <Link
              to="/register"
             className="text-[#556B2F] font-bold hover:underline"            >
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#556B2F] font-bold hover:underline"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}