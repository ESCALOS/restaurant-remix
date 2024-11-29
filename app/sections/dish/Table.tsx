import { Dish } from "types";
import TableHeader from "~/components/TableHeader";
import IconButton from "~/components/IconButton";
import { useNavigate } from "@remix-run/react";

export default function Table({
  dishes,
  onDelete,
}: {
  dishes: Dish[];
  onDelete: (id: string) => void;
}) {
  const navigate = useNavigate();

  const columns = ["Nombre", "Descripción", "Precio", "Categoría", "Acciones"];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader columns={columns} />
        <tbody className="divide-y divide-gray-200 bg-white">
          {dishes.map((dish) => (
            <tr key={dish.id}>
              <td className="text-sm font-medium text-primary-900">
                {dish.name}
              </td>
              <td className="text-sm font-medium text-primary-900">
                {dish.description}
              </td>
              <td className="text-sm font-medium text-primary-900">
                S/. {dish.price.toFixed(2)}
              </td>
              <td className="text-sm font-medium text-primary-900">
                {dish.category.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <IconButton
                  icon="tabler:pencil"
                  onClick={() => navigate(`/admin/dishes/${dish.id}/edit`)}
                  className="mr-2"
                />
                <IconButton
                  className="ml-2"
                  icon="tabler:trash"
                  variant="danger"
                  onClick={() => onDelete(dish.id.toString())}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
