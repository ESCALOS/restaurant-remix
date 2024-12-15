import { useEffect } from "react";
import { getOrderByTable, updateOrder, deleteOrder } from "~/services/OrderService";
import { getTable } from "~/services/TableService";
import { getProducts } from "~/services/ProductService";
import { toast } from "sonner";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
import WaiterLayout from "~/layouts/WaiterLayout";
import { getSession } from "~/session.server";
import { getCategories } from "~/services/CategoryService";
import OrderForm from "~/sections/order/OrderForm";
import { Category, Product, Table, Order } from "types";

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.tableId, "No se ha proporcionado el id de la mesa");
  const session = await getSession(request.headers.get("Cookie"));

  try {
    const tableId = params.tableId;
    const table = await getTable(request, tableId);
    const products = await getProducts(request);
    const categories = await getCategories(request);
    const existingOrder = await getOrderByTable(request, tableId);

    return json({ table, products, categories, existingOrder });
  } catch (error) {
    console.error("Loader Error:", error);
    return json({ table: null, products: [], categories: [], existingOrder: null }); // Evita fallos en SSR
  }
};

export const action: ActionFunction = async ({ params, request }) => {
  invariant(params.tableId, "No se ha proporcionado el id de la mesa");
  const formData = await request.formData();
  const parsedData = JSON.parse(formData.get("items") as string);
  const tableId = params.tableId;
  const table = await getTable(request, tableId);
  
  const existingOrder = await getOrderByTable(request, tableId);

  console.log("parsedData", parsedData);

  // Actualizar o eliminar productos según sea necesario
  for (const item of existingOrder.details) {
    const updatedItem = parsedData.find((i: any) => i.id === item.product.id);
    if (updatedItem) {
      await updateOrder(request, item.id, item.product.id, updatedItem.quantity);
    } else {
      await deleteOrder(request, item.id, item.product.id);
    }
  }

  // Agregar nuevos productos
  for (const item of parsedData) {
    if (item.product && !existingOrder.details.find((i: any) => i.product.id === item.id)) {
        await updateOrder(request, item.id, item.product.id, item.quantity);
    }
}

  return json({ message: "Order updated successfully" }, { status: 200 });
};

const EditOrder = () => {
  const { table, products, categories, existingOrder } = useLoaderData<{ table: Table, products: Array<Product>, categories: Array<Category>, existingOrder: Order }>();

  return (
    <WaiterLayout>
      <OrderForm table={table} products={products} categories={categories} existingOrder={existingOrder} />
    </WaiterLayout>
  );
};

export default EditOrder;
