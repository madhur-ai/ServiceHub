import SearchBar from "./SearchBar";

export default function Hero() {
  return (
<section className="bg-gradient-to-r from-[#435625] via-[#556B2F] to-[#6B8E23] text-white">      
  <div className="max-w-7xl mx-auto px-6 py-28 lg:py-36">

        <div className="max-w-4xl">

          <p className="text-xl font-medium text-[#E8F2D9] mb-3">
            Trusted Professionals at Your Doorstep
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.15]">
            Book Home Services
            <span className="block text-[#FFD166]">
              Anytime, Anywhere
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-gray-100 max-w-2xl leading-8">
            Electricians, Plumbers, AC Repair, Carpenters,
            Cleaning and much more.
          </p>

          <div className="mt-12">
            <SearchBar />
            <div className="mt-10 flex flex-wrap gap-6 text-sm md:text-base text-[#E8F2D9]">

  <span>✔ Verified Professionals</span>

  <span>✔ Same Day Service</span>

  <span>✔ 24×7 Support</span>

</div>
          </div>

        </div>

      </div>
    </section>
  );
}