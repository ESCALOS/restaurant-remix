import { Category } from "types";
import TableHeader from "~/components/TableHeader";
import IconButton from "~/components/IconButton";
import { useNavigate } from "@remix-run/react";

export default function Table({
  categories,
  onDelete,
}: {
  categories: Category[];
  onDelete: (id: string) => void;
}) {
  const navigate = useNavigate();

  const columns = ["Nombre", "Acciones"];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader columns={columns} />
        <tbody className="divide-y divide-gray-200 bg-white">
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="text-sm font-medium text-primary-900">
                {category.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <IconButton
                  icon="tabler:pencil"
                  color="accent"
                  onClick={() =>
                    navigate(`/admin/categories/${category.id}/edit`)
                  }
                  className="mr-2"
                />
                <IconButton
                  className="ml-2"
                  icon="tabler:trash"
                  color="red"
                  onClick={() => onDelete(category.id.toString())}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
