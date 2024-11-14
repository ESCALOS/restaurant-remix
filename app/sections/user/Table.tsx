import { User } from "types";
import {
  RoleEnum,
  RoleEnumColors,
  RoleEnumLabels,
} from "~/utils/enums/RoleEnum";
import { Icon } from "@iconify/react";
import { Navigate, useNavigate } from "@remix-run/react";

export default function Table({
  users,
  onDelete,
}: {
  users: User[];
  onDelete: (id: string) => void;
}) {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-accent-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-700">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-700">
              Usuario
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-700">
              Documento
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-700">
              Celular
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-700">
              Rol
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-700">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm font-medium text-primary-900">
                  {user.name}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-primary-700">{user.username}</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-primary-700">
                  {user.document_type} - {user.document_number}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-primary-700">{user.phone}</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    RoleEnumColors[user.role as RoleEnum]
                  }`}
                >
                  {RoleEnumLabels[user.role as RoleEnum] || user.role}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 cursor-pointer ${
                    user.is_enabled
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                  onClick={() =>
                    alert(user.is_enabled ? "Deshabilitar" : "Habilitar")
                  }
                >
                  {user.is_enabled ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <button
                  className="mr-2 text-accent-600 hover:text-accent-900"
                  onClick={() => navigate(`/admin/users/${user.id}/edit`)}
                >
                  <Icon icon="tabler:pencil" width="24" height="24" />
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => onDelete(user.id.toString())}
                >
                  <Icon icon="tabler:trash" width="24" height="24" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
