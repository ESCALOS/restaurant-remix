import { create } from "zustand";
import { Table as TableType } from "types";

type TableTypeStore = TableType & { is_persistent: boolean };

interface TableStore {
  tables: TableTypeStore[];
  lastId: number;
  setInitialTables: (initialTables: TableType[]) => void;
  addTable: () => void;
  updateTable: (updatedTable: TableTypeStore, oldId: number) => void;
  deleteTable: (id: number) => void;
}

export const useTableStore = create<TableStore>((set) => ({
  tables: [],
  lastId: 0,
  setInitialTables: (initialTables) =>
    set({
      tables: initialTables
        .map((table) => ({
          ...table,
          is_persistent: true, // Marcar tablas iniciales como persistentes
        }))
        .sort((a, b) => a.number.localeCompare(b.number)), // Ordenar por el atributo `number`
    }),
  addTable: () =>
    set((state) => {
      const newTable = {
        id: state.lastId - 1,
        number: "",
        is_available: false,
        is_persistent: false, // Nueva tabla no es persistente inicialmente
      };
      const updatedTables = [newTable, ...state.tables].sort((a, b) =>
        a.number.localeCompare(b.number)
      ); // Ordenar después de agregar
      return {
        tables: updatedTables,
        lastId: state.lastId - 1,
      };
    }),
  updateTable: (updatedTable, oldId) =>
    set((state) => {
      const updatedTables = state.tables
        .map((table) => (table.id === oldId ? { ...updatedTable } : table))
        .sort((a, b) => a.number.localeCompare(b.number)); // Ordenar después de actualizar
      return {
        tables: updatedTables,
      };
    }),
  deleteTable: (id) =>
    set((state) => ({
      tables: state.tables.filter((table) => table.id !== id),
    })),
}));
