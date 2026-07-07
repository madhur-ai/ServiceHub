export default function SectionTitle({
  title,
  subtitle,
}) {
  return (
    <div className="text-center mb-20">

      <h2 className="text-5xl md:text-6xl font-bold">
        {title}
      </h2>

      <p className="mt-3 text-gray-500 text-lg max-w-2xl mx-auto leading-8">
        {subtitle}
      </p>

    </div>
  );
}