import { Link, NavLink } from "@remix-run/react";
import { useState } from "react";
import { MenuIcon, UserIcon, DashboardIcon, UsersIcon, TablesIcon, CategoriesIcon, ProductsIcon, DishesIcon, StockIcon, ReportsIcon } from "./components/Icons";
import UserMenu from "./components/UserMenu";
import Sidebar from "./components/Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-accent-100">
      {/* Top Bar */}
      <header className="fixed top-0 z-50 w-full bg-primary-800 shadow-lg">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-4 rounded p-1 text-primary-100 hover:bg-primary-700 lg:hidden"
            >
              <MenuIcon />
            </button>
            <Link to="/admin" className="flex items-center">
              <img
                src="https://res.cloudinary.com/defhixtcv/image/upload/v1731013213/logo-chaufero-rmbg_s80bkw.webp"
                alt="Logo"
                className="h-10 w-auto"
              />
              <span className="text-2xl text-accent-500 font-bold ml-2">
                El Chaufero
              </span>
            </Link>
          </div>
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white hover:bg-primary-700"
            >
              <UserIcon />
            </button>
            {userMenuOpen && <UserMenu />}
          </div>
        </div>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="pt-16 lg:ml-64">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}

const navItems = [
  { name: "Panel", path: "/admin/dashboard", icon: <DashboardIcon /> },
  { name: "Usuarios", path: "/admin/users", icon: <UsersIcon /> },
  { name: "Mesas", path: "/admin/tables", icon: <TablesIcon /> },
  { name: "Categorías", path: "/admin/categories", icon: <CategoriesIcon /> },
  { name: "Productos", path: "/admin/products", icon: <ProductsIcon /> },
  { name: "Platos", path: "/admin/dishes", icon: <DishesIcon /> },
  { name: "Stock", path: "/admin/stock", icon: <StockIcon /> },
  { name: "Reportes", path: "/admin/reports", icon: <ReportsIcon /> },
];
