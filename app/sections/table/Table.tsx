import { Table as TableType } from "types";
import TableHeader from "~/components/TableHeader";
import IconButton from "~/components/IconButton";
import { useNavigate } from "@remix-run/react";

export default function Table({
  tables,
  onDelete,
}: {
  tables: TableType[];
  onDelete: (id: string) => void;
}) {
  const navigate = useNavigate();

  const columns = ["Nombre", "Acciones"];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader columns={columns} />
        <tbody className="divide-y divide-gray-200 bg-white">
          {tables.map((table) => (
            <tr key={table.id}>
              <td className="text-sm font-medium text-primary-900">
                Mesa #{table.number.padStart(3, "0")}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <IconButton
                  icon="tabler:pencil"
                  onClick={() => navigate(`/admin/tables/${table.id}/edit`)}
                  className="mr-2"
                />
                <IconButton
                  className="ml-2"
                  icon="tabler:trash"
                  variant="danger"
                  onClick={() => onDelete(table.id.toString())}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
