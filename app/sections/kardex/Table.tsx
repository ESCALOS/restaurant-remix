import { Kardex } from "types";
import TableHeader from "~/components/TableHeader";
import IconButton from "~/components/IconButton";
import { useNavigate } from "@remix-run/react";
import { Badge } from "~/components/Badge";
import {
  MovementTypeEnumColors,
  MovementTypeEnumLabels,
} from "~/utils/enums/MovementTypeEnum";

export default function Table({
  kardexes,
  onDelete,
}: {
  kardexes: Kardex[];
  onDelete: (id: string) => void;
}) {
  const navigate = useNavigate();

  const columns = [
    "Producto",
    "Cantidad",
    "Tipo de movimiento",
    "Razón",
    "Acciones",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader columns={columns} />
        <tbody className="divide-y divide-gray-200 bg-white">
          {kardexes.map((kardex) => (
            <tr key={kardex.id}>
              <td className="text-sm font-medium text-primary-900">
                {kardex.product.name}
              </td>
              <td className="text-sm text-primary-900">{kardex.quantity}</td>
              <td>
                <Badge className={MovementTypeEnumColors[kardex.movement_type]}>
                  {MovementTypeEnumLabels[kardex.movement_type]}
                </Badge>
              </td>
              <td className="text-sm text-primary-900">{kardex.reason}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <IconButton
                  icon="tabler:pencil"
                  onClick={() => navigate(`/admin/kardex/${kardex.id}/edit`)}
                  className="mr-2"
                />
                <IconButton
                  className="ml-2"
                  icon="tabler:trash"
                  variant="danger"
                  onClick={() => onDelete(kardex.id.toString())}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
