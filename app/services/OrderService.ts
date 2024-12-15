import { fetchWithAuth } from "~/utils/auth.server";
import { Order } from "types";

export const getOrders = async (request: Request): Promise<Order[]> => {
    return await fetchWithAuth<Order[]>(request, "/orders");
};

export const getOrder = async (
    request: Request,
    id: string
): Promise<Order> => {
    return await fetchWithAuth<Order>(request, `/orders/${id}`);
};

/* export const createOrder = async (
    request: Request,
    data: Omit<Order, "id"> & { table_id: number }
): Promise<Order> => {
    return await fetchWithAuth<Order>(request, "/orders", {
        method: "POST",
        body: JSON.stringify(data),
    });
}; */

/* {
	"details": [
		{
			"product_id": 1,
			"quantity": 5
		}
	]
} */

// {{server_url}}/api/v1/orders/40
export const createOrder = async (
    request: Request,
    table_id: number,
    data: {  details: { product_id: number, quantity: number }[] }
): Promise<Order> => {
    return await fetchWithAuth<Order>(request, `/orders/${table_id}`, {
        method: "POST",
        body: JSON.stringify(data),
    });
};

// update orders orders/9/products/2?quantity=7
export const updateOrder = async (
    request: Request,
    id: number,
    product_id: number,
    quantity: number
): Promise<void> => {
    return await fetchWithAuth<void>(request, `/orders/${id}/products/${product_id}`, {
        method: "PUT",
        body: JSON.stringify({ quantity }),
    });
};

// delete products /orders/9/products/3
export const deleteOrder = async (
    request: Request,
    id: number,
    product_id?: number,
): Promise<void> => {
    const url = product_id 
        ? `/orders/${id}/products/${product_id}` 
        : `/orders/${id}`;
    
    return await fetchWithAuth<void>(request, url, {
        method: "DELETE",
    });
};

// view order by table number /orders/table/:tableNumber
export const getOrderByTable = async (
    request: Request,
    tableNumber: string
): Promise<Order> => {
    return await fetchWithAuth<Order>(request, `/orders/table/${tableNumber}`);
};
