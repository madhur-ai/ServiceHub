import CategoryCard from "../cards/CategoryCard";
import SectionTitle from "../ui/SectionTitle";

const categories = [
  {
    id: 1,
    icon: "⚡",
    name: "Electrician",
  },
  {
    id: 2,
    icon: "🚿",
    name: "Plumber",
  },
  {
    id: 3,
    icon: "🪚",
    name: "Carpenter",
  },
  {
    id: 4,
    icon: "❄",
    name: "AC Repair",
  },
  {
    id: 5,
    icon: "🎨",
    name: "Painter",
  },
  {
    id: 6,
    icon: "🧹",
    name: "Cleaning",
  },
];

export default function Categories() {
  return (
    <section className="py-24 bg-[#F8FAF6]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title="Popular Categories"
          subtitle="Choose from a wide range of trusted home services."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              icon={category.icon}
              name={category.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}