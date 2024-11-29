import { Link } from "@remix-run/react";
import { useState } from "react";
import UserMenu from "./components/UserMenu";
import Sidebar from "./components/Sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";

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
              <Icon icon="mdi:menu" width={24} height={24} />
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
              <Icon icon="mdi:account" width={24} height={24} />
            </button>
            {userMenuOpen && <UserMenu />}
          </div>
        </div>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></button>
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
