import SectionTitle from "../ui/SectionTitle";

const testimonials = [
  {
    name: "Rahul Sharma",
    city: "Bhopal",
    review:
      "Booked an electrician within 15 minutes. Amazing experience!",
  },
  {
    name: "Priya Singh",
    city: "Indore",
    review:
      "Professional plumber arrived on time. Highly recommended.",
  },
  {
    name: "Aman Gupta",
    city: "Delhi",
    review:
      "Excellent cleaning service. Will definitely book again.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#F8FAF6]">
      <div className="max-w-7xl mx-auto px-6">

        <SectionTitle
          title="What Our Customers Say"
          subtitle="Real reviews from happy customers."
        />

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8"
            >
              <div className="text-amber-500 text-2xl tracking-wide">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="mt-5 text-gray-600 leading-8 italic">
                "{item.review}"
              </p>

              <h3 className="font-bold text-lg mt-8 text-[#2D2D2D]">
                {item.name}
              </h3>

              <p className="text-gray-500 text-sm">
                {item.city}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}