
export default function StatusBadge({
  isEnabled,
  onClick,
}: {
  isEnabled: boolean;
  onClick: () => void;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 cursor-pointer ${
        isEnabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
      onClick={onClick}
    >
      {isEnabled ? "Activo" : "Inactivo"}
    </span>
  );
}