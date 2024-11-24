import { User } from "types";
import {
  RoleEnum,
  RoleEnumColors,
  RoleEnumLabels,
} from "~/utils/enums/RoleEnum";
import { Navigate, useNavigate } from "@remix-run/react";
import TableHeader from "~/components/TableHeader";
import TableRow from "~/components/TableRow";
import StatusBadge from "~/components/StatusBadge";
import IconButton from "~/components/IconButton";

export default function Table({
  users,
  onDelete,
}: {
  users: User[];
  onDelete: (id: string) => void;
}) {
  const columns = [
    "Nombre",
    "Usuario",
    "Documento",
    "Celular",
    "Rol",
    "Estado",
    "Acciones",
  ];

  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader columns={columns} />
        <tbody className="divide-y divide-gray-200 bg-white">
          {users.map((user) => (
            <TableRow
              key={user.id}
              data={[
                <div className="text-sm font-medium text-primary-900">
                  {user.name}
                </div>,
                user.username,
                `${user.document_type} - ${user.document_number}`,
                user.phone,
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${RoleEnumColors[user.role as RoleEnum]
                    }`}
                >
                  {RoleEnumLabels[user.role as RoleEnum] || user.role}
                </span>,
                <StatusBadge
                  isEnabled={user.is_enabled}
                  onClick={() =>
                    alert(user.is_enabled ? "Deshabilitar" : "Habilitar")
                  }
                />,
                <div className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <IconButton
                    icon="tabler:pencil"
                    color="accent"
                    onClick={() => navigate(`/admin/users/${user.id}/edit`)}
                    className="mr-2"
                  />
                  <IconButton
                    className="ml-2"
                    icon="tabler:trash"
                    color="red"
                    onClick={() => onDelete(user.id.toString())}
                  />
                </div>,
              ]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
