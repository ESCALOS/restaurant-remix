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
      tables: initialTables.map((table) => ({
        ...table,
        is_persistent: true, // Marcar tablas iniciales como persistentes
      })),
    }),
  addTable: () =>
    set((state) => ({
      tables: [
        {
          id: state.lastId - 1,
          number: "",
          is_available: false,
          is_persistent: false, // Nueva tabla no es persistente inicialmente
        },
        ...state.tables,
      ],
      lastId: state.lastId - 1,
    })),
  updateTable: (updatedTable, oldId) =>
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === oldId ? { ...updatedTable } : table
      ),
      lastId: updatedTable.id > state.lastId ? updatedTable.id : state.lastId,
    })),
  deleteTable: (id) =>
    set((state) => ({
      tables: state.tables.filter((table) => table.id !== id),
    })),
}));
