import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";

const services = [
  {
    id: 1,
    name: "Electrician",
    rating: "4.8",
    price: "₹299",
    image: "/images/electrician.jpg",
  },
 {
    id:2,
    name:"Plumber",
    rating:"4.7",
    price:"₹399",
    image:"/images/plumber.jpg"
},
  {
    id:3,
    name:"AC Repair",
    rating:"4.9",
    price:"₹599",
    image:"/images/acrepair.jpg"
}
];

export default function PopularServices() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          title="Popular Services"
          subtitle="Most booked services by our customers."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service) => (

            <div
              key={service.id}
              className="bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >

              <img
                src={service.image}
                alt={service.name}
                className="h-56 w-full object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold text-[#2D2D2D]">
                  {service.name}
                </h3>

                <p className="mt-3 text-gray-500">
                  ⭐ {service.rating} Rating
                </p>

                <div className="flex justify-between items-center mt-6">

                  <span className="text-2xl font-bold text-[#556B2F]">
                    {service.price}
                  </span>

                  <Button>
                    Book
                  </Button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}