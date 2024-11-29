import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink } from "@remix-run/react";

const navItems = [
  { name: "Panel", path: "/admin/dashboard", icon: "mdi:view-dashboard" },
  { name: "Usuarios", path: "/admin/users", icon: "mdi:account-multiple" },
  { name: "Mesas", path: "/admin/tables", icon: "mdi:table" },
  { name: "Categorías", path: "/admin/categories", icon: "mdi:tag-multiple" },
  { name: "Productos", path: "/admin/products", icon: "mdi:food" },
  { name: "Platos", path: "/admin/dishes", icon: "mdi:food-fork-drink" },
  { name: "Kardex", path: "/admin/kardex", icon: "mdi:cart-arrow-down" },
  { name: "Reportes", path: "/admin/reports", icon: "mdi:chart-bar" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 transform bg-primary-700 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="mt-4 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `mb-1 flex items-center rounded-lg px-4 py-2 text-sm font-medium ${
                isActive
                  ? "bg-accent-500 text-primary-900"
                  : "text-primary-100 hover:bg-primary-600"
              }`
            }
          >
            <Icon icon={item.icon} />
            <span className="ml-3">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
