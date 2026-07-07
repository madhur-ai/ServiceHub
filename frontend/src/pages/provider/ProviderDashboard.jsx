import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Briefcase,
  Plus,
  CalendarCheck,
} from "lucide-react";

import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import ServiceCard from "../../components/cards/ServiceCard";

import {
  getMyServices,
  deleteService,
} from "../../api/service/serviceApi";

export default function ProviderDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await getMyServices();
      setServices(res.services);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load services"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Delete this service?"
      );

      if (!confirmDelete) return;

      await deleteService(id);

      toast.success("Service Deleted");

      loadServices();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAF6] py-10">

      <div className="max-w-7xl mx-auto px-6">

        

        <div className="bg-gradient-to-r from-[#435625] via-[#556B2F] to-[#6B8E23] rounded-3xl p-10 text-white shadow-xl">

          <h1 className="text-4xl font-extrabold">
            Welcome Provider 👋
          </h1>

          <p className="mt-3 text-lg text-[#EEF4E7]">
            Manage your services and booking requests.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">

            <Link to="/provider/create-service">
              <Button>
                <span className="flex items-center gap-2">
                  <Plus size={18} />
                  Create Service
                </span>
              </Button>
            </Link>

            <Link to="/provider/bookings">
              <Button variant="secondary">
                <span className="flex items-center gap-2">
                  <CalendarCheck size={18} />
                  Booking Requests
                </span>
              </Button>
            </Link>

          </div>

        </div>

        
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-3xl shadow-md p-8 text-center">

            <Briefcase
              className="mx-auto text-[#556B2F]"
              size={42}
            />

            <h2 className="text-4xl font-bold mt-4">
              {services.length}
            </h2>

            <p className="text-gray-500 mt-2">
              Total Services
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-8 text-center">

            <CalendarCheck
              className="mx-auto text-[#556B2F]"
              size={42}
            />

            <h2 className="text-4xl font-bold mt-4">
              Active
            </h2>

            <p className="text-gray-500 mt-2">
              Provider Status
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-8 text-center">

            <Plus
              className="mx-auto text-[#556B2F]"
              size={42}
            />

            <h2 className="text-4xl font-bold mt-4">
              {services.length}
            </h2>

            <p className="text-gray-500 mt-2">
              Listed Services
            </p>

          </div>

        </div>

       

        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-8">
            My Services
          </h2>

          {services.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-lg p-14 text-center">

              <h2 className="text-3xl font-bold">
                No Services Yet
              </h2>

              <p className="text-gray-500 mt-4">
                Create your first service and start receiving bookings.
              </p>

              <Link
                to="/provider/create-service"
                className="inline-block mt-8"
              >
                <Button>
                  + Create Service
                </Button>
              </Link>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {services.map((service) => (

                <ServiceCard
                  key={service._id}
                  service={service}
                  handleDelete={handleDelete}
                />

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}