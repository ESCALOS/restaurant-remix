interface BadgeProps {
  variant?: keyof typeof variantStyles;
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  default: "bg-accent-100 text-white ring-1 ring-accent-500/20",
  success: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-500/20",
  warning: "bg-amber-100 text-amber-800 ring-1 ring-amber-500/20",
  danger: "bg-red-100 text-red-800 ring-1 ring-red-500/20",
  info: "bg-sky-100 text-sky-800 ring-1 ring-sky-500/20",
};

export function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
