import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-900 text-primary-100">
      <h1>Creo que no tienes rol de usuario</h1>
    </div>
  );
}
