import { Wrench } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2"
    >
      <div className="bg-[#556B2F] text-white p-2 rounded-xl">
        <Wrench size={22} />
      </div>

      <div>
        <h1 className="font-bold text-xl">
          ServiceHub
        </h1>

        <p className="text-xs text-gray-500">
          Home Services
        </p>
      </div>
    </Link>
  );
}