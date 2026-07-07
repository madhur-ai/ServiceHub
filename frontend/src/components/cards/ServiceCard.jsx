import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function ServiceCard({ service ,
    handleDelete, }) {
  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">

     <img
  src={
    service.image && service.image.trim() !== ""
      ? service.image
      : "/images/default-service.jpg"
  }
  alt={service.title}
  className="h-56 w-full object-cover"
  onError={(e) => {
    e.target.src = "/images/default-service.jpg";
  }}
/>

      <div className="p-5">

        <h2 className="text-2xl font-bold">
          {service.title}
        </h2>

        <p className="text-gray-500 mt-1">
          {service.category}
        </p>

        <p className="text-sm mt-3 line-clamp-2">
          {service.description}
        </p>

        <div className="flex justify-between mt-5">

          <span className="font-bold text-[#556B2F] text-2xl">
            ₹ {service.price}
          </span>

          <span className="text-gray-500">
            {service.city}
          </span>

        </div>

        <div className="flex gap-3 mt-6">

  <Link
    to={`/provider/edit/${service._id}`}
    className="flex-1"
  >
    <Button className="w-full">
      Edit
    </Button>
  </Link>

  <Button
    variant="danger"
    className="flex-1"
    onClick={() =>
        handleDelete(service._id)
    }
>
    Delete
</Button>

</div>

      </div>

    </div>
  );
}