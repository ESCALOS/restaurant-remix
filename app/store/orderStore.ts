import { create } from "zustand";
import { Order } from "types";

interface OrderStore {
  orders: Order[];
  setInitialOrders: (initialOrders: Order[]) => void;
  addOrder: (newOrder: Order) => void;
  updateOrder: (updatedOrder: Order) => void;
  deleteOrder: (id: number) => void;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  setInitialOrders: (initialOrders) =>
    set({
      orders: initialOrders,
    }),
  addOrder: (newOrder) =>
    set((state) => ({
      orders: [newOrder, ...state.orders],
    })),
  updateOrder: (updatedOrder) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      ),
    })),
  deleteOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    }))
}));
