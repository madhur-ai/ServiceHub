export default function CategoryCard({ icon, name }) {
  return (
    <div className="bg-[#FCFCFA] border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-center group">

      <div className="w-20 h-20 mx-auto rounded-full bg-[#EEF4E7] flex items-center justify-center text-5xl group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold text-[#2D2D2D]">
        {name}
      </h3>

      <p className="text-sm text-gray-500 mt-3">
        Trusted Experts
      </p>

    </div>
  );
}