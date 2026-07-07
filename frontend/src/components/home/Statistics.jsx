const stats = [
  {
    number: "10K+",
    label: "Happy Customers",
  },
  {
    number: "500+",
    label: "Professionals",
  },
  {
    number: "15+",
    label: "Cities",
  },
  {
    number: "4.9★",
    label: "Average Rating",
  },
];

export default function Statistics() {
  return (
<section className="bg-[#556B2F] py-24 text-white">      <div className="max-w-7xl mx-auto px-6">

<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">

          {stats.map((stat) => (
            <div key={stat.label}>
<h2 className="text-5xl lg:text-6xl font-extrabold">                {stat.number}
              </h2>

<p className="mt-3 text-lg text-gray-200">
                  {stat.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}