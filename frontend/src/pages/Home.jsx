import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import PopularServices from "../components/home/PopularServices";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Statistics from "../components/home/Statistics";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <PopularServices />
      <WhyChooseUs />
      <Statistics />
      <Testimonials />
      <CTA />
    </>
  );
}
