export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#EEF4E7] px-4 py-2 text-sm font-semibold text-[#556B2F] border border-[#D8E4C6]">
      {children}
    </span>
  );
}