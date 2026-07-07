import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function CTA() {
  const { user } = useAuth();
  return (
    <section className="py-24 bg-[#556B2F] text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">

       <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          Ready to Book a Service?
        </h2>

        <p className="mt-6 text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-8">
          Join thousands of happy customers and get trusted professionals at your doorstep.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">

          <Link to="/services">
  <Button className="bg-white !text-[#556B2F] hover:bg-[#EEF4E7]">
    Explore Services
  </Button>
</Link>

<Link
  to={
    !user
      ? "/register"
      : user.role === "provider"
      ? "/provider"
      : "/customer"
  }
>
 <Button className="bg-white !text-[#556B2F] hover:bg-[#EEF4E7]">
  {!user
    ? "Become a Provider"
    : "Go to Dashboard"}
</Button>
</Link>

        </div>

      </div>
    </section>
  );
}