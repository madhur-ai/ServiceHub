export default function EmptyState({
  title,
  subtitle,
}) {
  return (
    <div className="py-20 text-center">

      <h2 className="text-2xl font-bold">

        {title}

      </h2>

      <p className="mt-3 text-gray-500">

        {subtitle}

      </p>

    </div>
  );
}