import { Search } from "lucide-react";

export default function SearchBar() {
  return (
<div className="bg-white rounded-2xl shadow-xl border border-gray-200 flex overflow-hidden">
      <input
        type="text"
        placeholder="Search services..."
className="flex-1 px-6 py-4 outline-none text-gray-700 placeholder:text-gray-400"      />

      <button className="bg-[#556B2F] hover:bg-[#435625] transition-all duration-300 px-7 flex items-center justify-center">
        <Search className="text-white" />
      </button>

    </div>
  );
}