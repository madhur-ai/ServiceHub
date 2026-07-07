import ServiceForm from "../../components/forms/ServiceForm";

export default function EditService() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">
        Edit Service
      </h1>

      <ServiceForm isEdit />
    </div>
  );
}