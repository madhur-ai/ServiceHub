export default function RoleSelector({
  register,
  error,
}) {
  return (
    <div className="space-y-2">

      <label className="block text-sm font-semibold text-gray-700">
        Select Your Role
      </label>

      <select
        {...register("role", {
          required: "Please select a role",
        })}
        className={`w-full rounded-2xl border px-5 py-3 bg-white outline-none transition-all duration-300 ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-gray-300 focus:border-[#556B2F] focus:ring-2 focus:ring-[#DDE8D1]"
        }`}
      >
        <option value="customer">
          👤 Customer
        </option>

        <option value="provider">
          🛠 Service Provider
        </option>

      </select>

      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}

    </div>
  );
}