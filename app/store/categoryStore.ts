import { create } from "zustand";
import { Category as CategoryType } from "types";

type CategoryTypeStore = CategoryType & { is_persistent: boolean };

interface CategoryStore {
  categories: CategoryTypeStore[];
  lastId: number;
  setInitialCategories: (initialCategories: CategoryType[]) => void;
  addCategory: () => void;
  updateCategory: (updatedCategory: CategoryTypeStore, oldId: number) => void;
  deleteCategory: (id: number) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  lastId: 0,
  setInitialCategories: (initialCategorys) =>
    set({
      categories: initialCategorys.map((category) => ({
        ...category,
        is_persistent: true, // Marcar tablas iniciales como persistentes
      })),
    }),
  addCategory: () =>
    set((state) => ({
      categories: [
        {
          id: state.lastId - 1,
          name: "",
          is_persistent: false, // Nueva tabla no es persistente inicialmente
        },
        ...state.categories,
      ],
      lastId: state.lastId - 1,
    })),
  updateCategory: (updatedCategory, oldId) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === oldId ? { ...updatedCategory } : category
      ),
      lastId:
        updatedCategory.id > state.lastId ? updatedCategory.id : state.lastId,
    })),
  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
}));
