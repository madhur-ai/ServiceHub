export default function Avatar({ name }) {
  return (
    <div className="w-12 h-12 rounded-full bg-[#556B2F] flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-[#EEF4E7]">
      {name?.charAt(0)?.toUpperCase()}
    </div>
  );
}