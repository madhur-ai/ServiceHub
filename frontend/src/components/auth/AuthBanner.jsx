import { ShieldCheck, Wrench } from "lucide-react";

export default function AuthBanner() {
  return (
    <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-[#435625] via-[#556B2F] to-[#6B8E23] text-white px-20">

      <div className="flex items-center gap-5">

        <div className="bg-white text-[#556B2F] p-5 rounded-3xl shadow-lg">
          <Wrench size={38} />
        </div>

        <h1 className="text-5xl font-extrabold tracking-wide">
          ServiceHub
        </h1>

      </div>

      <div className="mt-16 w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
        <ShieldCheck size={60} />
      </div>

      <h2 className="text-5xl font-extrabold mt-10 leading-tight">
        Trusted Home
        <br />
        Services
      </h2>

      <p className="mt-6 text-[#EEF4E7] text-xl leading-8 max-w-md">
        Book trusted electricians, plumbers,
        painters, carpenters and many more
        verified professionals at your doorstep.
      </p>

      <div className="mt-10 space-y-3 text-lg">

        <p>✔ Verified Professionals</p>

        <p>✔ Fast Booking</p>

        <p>✔ Secure Payments</p>

      </div>

    </div>
  );
}