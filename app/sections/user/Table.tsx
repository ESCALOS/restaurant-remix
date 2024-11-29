import { User } from "types";
import { RoleEnumColors, RoleEnumLabels } from "~/utils/enums/RoleEnum";
import { useNavigate } from "@remix-run/react";
import TableHeader from "~/components/TableHeader";
import IconButton from "~/components/IconButton";
import { Badge } from "~/components/Badge";
import { DocumentTypeEnumColors } from "~/utils/enums/DocumentTypeEnum";

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
            <tr key={user.id}>
              <td className="text-sm font-medium text-primary-900">
                {user.name}
              </td>
              <td className="text-sm text-primary-900">{user.username}</td>
              <td className="text-sm text-primary-900">
                <Badge className={DocumentTypeEnumColors[user.document_type]}>
                  {user.document_type} - {user.document_number}
                </Badge>
              </td>
              <td className="text-sm text-primary-900">{user.phone}</td>
              <td>
                <Badge className={RoleEnumColors[user.role]}>
                  {RoleEnumLabels[user.role]}
                </Badge>
              </td>
              <td>
                <Badge variant={user.is_enabled ? "success" : "danger"}>
                  {user.is_enabled ? "Activo" : "Inactivo"}
                </Badge>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <IconButton
                  icon="tabler:pencil"
                  onClick={() => navigate(`/admin/users/${user.id}/edit`)}
                  className="mr-2"
                />
                <IconButton
                  className="ml-2"
                  icon="tabler:trash"
                  variant="danger"
                  onClick={() => onDelete(user.id.toString())}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
