import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import {NextUIProvider} from "@nextui-org/react";
import { Toaster } from "sonner";
import { useLoadingStore } from "./store/loadingStore"; // Importa el store de zustand

import "./tailwind.css";
import { useEffect } from "react";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-16 h-16 border-4 border-t-accent-500 border-primary-100 rounded-full animate-spin"></div>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();
  const { isLoading, setLoading } = useLoadingStore(); // Utiliza el estado global de carga

  useEffect(() => {
    // Monitorea el estado de la navegación y actualiza el estado global de carga
    if (navigation.state === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [navigation.state]);

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-secondary-900 text-primary-100 relative">
        <NextUIProvider>
          <Toaster richColors position="top-center" />
          {isLoading && <LoadingSpinner />}{" "}
          {/* Muestra el LoadingSpinner solo cuando isLoading es true */}
          {children}
          <ScrollRestoration />
          <Scripts />
        </NextUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.log(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-900 text-primary-100">
      <h1>Error</h1>
      <p>Ocurrió un error</p>
    </div>
  );
}
