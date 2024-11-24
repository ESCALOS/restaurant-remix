
export default function UserMenu() {
  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
      <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-accent-100">
        Cambiar contraseña
      </button>
      <form method="post" action="/logout">
        <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-accent-100">
          Salir
        </button>
      </form>
    </div>
  );
}