import {
  ShieldCheck,
  Clock3,
  BadgeCheck,
  Headphones,
} from "lucide-react";

import SectionTitle from "../ui/SectionTitle";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    desc: "Every provider is background verified before joining.",
  },
  {
    icon: Clock3,
    title: "On Time Service",
    desc: "We value your time and ensure punctual visits.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Guaranteed",
    desc: "Only experienced professionals are listed.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Need help? Our support team is always available.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title="Why Choose ServiceHub?"
          subtitle="Trusted by thousands of customers across India."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <item.icon
                size={45}
                className="text-[#556B2F]"
              />

              <h3 className="text-2xl font-bold mt-6 text-[#2D2D2D]">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-4 leading-7">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}