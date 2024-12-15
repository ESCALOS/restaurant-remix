import { Link } from "@remix-run/react";
import { useState } from "react";
import UserMenu from "./components/UserMenu";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
    children: React.ReactNode;
}

const navItems = [
    { name: "Platos", path: "/waiter/dishes", icon: "mdi:food-fork-drink", isLeft: true },
    { name: "Productos", path: "/waiter/products", icon: "mdi:food", isCenter: true },
    { name: "Crear Ordenes", path: "/waiter", icon: "mdi:clipboard-list", isSpecial: true },
    { name: "Pagar Cuenta", path: "/waiter/payments", icon: "mdi:credit-card" },
    { name: "Usuarios", path: "/waiter/users", icon: "mdi:account", isRight: true },
];

export default function WaiterLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-accent-100 pb-16">

            <main className="pt-16 mx-10 md:mx-14 lg:mx-72">
                {children}
            </main>

            <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
                <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                    {navItems.map((item, index) => (
                        item.isSpecial ? (
                            <div key={index} className="flex items-center justify-center">
                                <Link to={item.path} className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                                    <Icon icon={item.icon} className="w-5 h-5 mb-1 text-white" />
                                    <span className="sr-only">{item.name}</span>
                                </Link>
                            </div>
                        ) : (
                            <Link key={index} to={item.path} className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${item.isLeft ? 'rounded-s-full' : ''} ${item.isRight ? 'rounded-e-full' : ''}`}>
                                <Icon icon={item.icon} className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
                                <span className="sr-only">{item.name}</span>
                            </Link>
                        )
                    ))}
                </div>
            </div>

        </div>
    );
}