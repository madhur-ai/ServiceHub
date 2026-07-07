import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CATEGORIES } from "../../constants/categories";
import { CITIES } from "../../constants/cities";



import { getAllServices } from "../../api/service/serviceApi";
import CustomerServiceCard from "../../components/cards/CustomerServiceCard";

export default function Services() {

  const [services, setServices] = useState([]);
const [filteredServices, setFilteredServices] = useState([]);
const [loading, setLoading] = useState(true);

const [search, setSearch] = useState("");

const [selectedCategory, setSelectedCategory] =
  useState("");

const [selectedCity, setSelectedCity] =
  useState("");



  const loadServices = async () => {
    try {
      const res = await getAllServices();

      setServices(res.services);
      setFilteredServices(res.services);
    } catch (error) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
    loadServices();
  }, []);

  
  useEffect(() => {
  let filtered = [...services];

  if (search) {
    filtered = filtered.filter((service) =>
      service.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  if (selectedCategory) {
    filtered = filtered.filter(
      (service) =>
        service.category === selectedCategory
    );
  }

  if (selectedCity) {
    filtered = filtered.filter(
      (service) =>
        service.city === selectedCity
    );
  }

  setFilteredServices(filtered);

}, [
  search,
  selectedCategory,
  selectedCity,
  services,
]);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-10">
        All Services
      </h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-10">

  {/* Search */}

  <input
    type="text"
    placeholder="Search Services..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-600"
  />

  {/* Category */}

  <select
    value={selectedCategory}
    onChange={(e) =>
      setSelectedCategory(e.target.value)
    }
    className="rounded-xl border border-gray-300 px-4 py-3"
  >
    <option value="">
      All Categories
    </option>

    {CATEGORIES.map((category) => (
      <option
        key={category}
        value={category}
      >
        {category}
      </option>
    ))}
  </select>

  {/* City */}

  <select
    value={selectedCity}
    onChange={(e) =>
      setSelectedCity(e.target.value)
    }
    className="rounded-xl border border-gray-300 px-4 py-3"
  >
    <option value="">
      All Cities
    </option>

    {CITIES.map((city) => (
      <option
        key={city}
        value={city}
      >
        {city}
      </option>
    ))}
  </select>

</div>

      {filteredServices.length === 0 ? (
        <h2 className="text-xl">
          No Services Found
        </h2>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredServices.map((service) => (
          <CustomerServiceCard
  key={service._id}
  service={service}
/>
          ))}

        </div>
      )}

    </div>
  );
}