import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  label,
  placeholder,
  register,
  name,
  rules = {},
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">

      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register(name, rules)}
          className={`w-full rounded-2xl border px-5 py-3 pr-14 bg-white outline-none transition-all duration-300 ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:border-[#556B2F] focus:ring-2 focus:ring-[#DDE8D1]"
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#556B2F] transition"
        >
          {showPassword ? (
            <EyeOff size={21} />
          ) : (
            <Eye size={21} />
          )}
        </button>

      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}

    </div>
  );
}