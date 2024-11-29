import { Product } from "types";
import TableHeader from "~/components/TableHeader";
import IconButton from "~/components/IconButton";
import { useNavigate } from "@remix-run/react";
import { Badge } from "~/components/Badge";

export default function Table({
  products,
  onDelete,
}: {
  products: Product[];
  onDelete: (id: string) => void;
}) {
  const navigate = useNavigate();

  const columns = [
    "Nombre",
    "Descripción",
    "Precio",
    "Categoría",
    "Stock",
    "Stock mínimo",
    "Acciones",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader columns={columns} />
        <tbody className="divide-y divide-gray-200 bg-white">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="text-sm font-medium text-primary-900">
                {product.name}
              </td>
              <td className="text-sm text-primary-900">
                {product.description}
              </td>
              <td className="text-sm text-primary-900">
                S/. {product.price.toFixed(2)}
              </td>
              <td className="text-sm text-primary-900">
                {product.category.name}
              </td>
              <td>
                <Badge
                  variant={
                    product.min_stock <= product.stock ? "success" : "danger"
                  }
                >
                  {product.stock}
                </Badge>
              </td>
              <td className="text-sm text-primary-900">{product.min_stock}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <IconButton
                  icon="tabler:pencil"
                  onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                  className="mr-2"
                />
                <IconButton
                  className="ml-2"
                  icon="tabler:trash"
                  variant="danger"
                  onClick={() => onDelete(product.id.toString())}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
