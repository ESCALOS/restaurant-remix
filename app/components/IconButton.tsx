import { Icon } from "@iconify/react";

export default function IconButton({
  icon,
  color,
  onClick,
  className = "",
}: {
  icon: string;
  color: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      className={`text-${color}-600 hover:text-${color}-900 ${className}`}
      onClick={onClick}
    >
      <Icon icon={icon} width="24" height="24" />
    </button>
  );
}
