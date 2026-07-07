import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function CustomerServiceCard({
  service,
}) {
  return (
    <div className="bg-white
rounded-3xl
border
border-gray-100
shadow-md
hover:shadow-2xl
hover:-translate-y-2
transition-all
duration-300
overflow-hidden">

     <img
  src={
    service.image && service.image.trim() !== ""
      ? service.image
      : "/images/default-service.jpg"
  }
  onError={(e) => {
    e.target.src = "/images/default-service.jpg";
  }}
/>

      <div className="p-5">

        <h2 className="text-2xl font-bold text-[#2D2D2D]">
          {service.title}
        </h2>

        <p className="text-gray-500 text-sm">
          {service.category}
        </p>

        <p className="mt-3 text-sm">
          {service.description}
        </p>

        <div className="flex justify-between mt-5">

          <span className="font-bold text-[#556B2F]">
            ₹ {service.price}
          </span>

          <span>
            {service.city}
          </span>

        </div>

        <Link
          to={`/service/${service._id}`}
        >
          <Button className="w-full mt-6">
            View Details
          </Button>
        </Link>

      </div>

    </div>
  );
}