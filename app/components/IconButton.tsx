import { Icon } from "@iconify/react";

const variantStyles = {
  default: "text-accent-500 hover:text-accent-600",
  danger: "text-red-500 hover:text-red-600",
  success: "text-emerald-500 hover:text-emerald-600",
  warning: "text-amber-500 hover:text-amber-600",
  info: "text-sky-500 hover:text-sky-600",
};

export default function IconButton({
  icon,
  variant = "default",
  onClick,
  className = "",
}: {
  icon: string;
  variant?: keyof typeof variantStyles;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      className={`${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      <Icon icon={icon} width="24" height="24" />
    </button>
  );
}
