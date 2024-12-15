import { useEffect } from "react";
import { createOrder } from "~/services/OrderService";
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
import { Category, Product, Table } from "types";

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.tableId, "No se ha proporcionado el id de la mesa");
  const session = await getSession(request.headers.get("Cookie"));

  try {
    const tableId = params.tableId;
    const table = await getTable(request, tableId);
    const products = await getProducts(request);
    const categories = await getCategories(request);

    return Response.json({ table, products, categories });
  } catch (error) {
    console.error("Loader Error:", error);
    return Response.json({ table: null, products: [], categories: [] }); // Evita fallos en SSR
  }
};

export const action: ActionFunction = async ({ params, request }) => {
  invariant(params.tableId, "No se ha proporcionado el id de la mesa");
  const formData = await request.formData();
  const parsedData = JSON.parse(formData.get("items") as string);
  const tableId = params.tableId;
  const table = await getTable(request, tableId);
  
  const order = {
    table_id: table.id,
    details: parsedData.map((item: any) => ({
      product_id: item.id,
      quantity: item.quantity
    }))
  };

  try {
    await createOrder(request, table.id, order);
    return Response.json({ message: "Order created successfully" }, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
};

const CreateOrder = () => {
  const { table, products, categories } = useLoaderData<{ table: Table, products: Array<Product>, categories: Array<Category> }>();

  return (
    <WaiterLayout>
      <OrderForm table={table} products={products} categories={categories} />
    </WaiterLayout>
  );
};

export default CreateOrder;