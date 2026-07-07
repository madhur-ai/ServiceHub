import ServiceForm from "../../components/forms/ServiceForm";

export default function CreateService() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Create New Service
        </h1>

        <p className="text-gray-500 mt-2">
          Add your professional service and start receiving bookings.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <ServiceForm />
      </div>

    </div>
  );
}