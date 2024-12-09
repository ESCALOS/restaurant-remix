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
  setInitialCategories: (initialCategories) =>
    set({
      categories: initialCategories
        .map((category) => ({
          ...category,
          is_persistent: true, // Marcar tablas iniciales como persistentes
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    }),
  addCategory: () =>
    set((state) => {
      const newCategory = {
        id: state.lastId - 1,
        name: "",
        is_persistent: false, // Nueva tabla no es persistente inicialmente
      };
      const updatedCategories = [newCategory, ...state.categories].sort(
        (a, b) => a.name.localeCompare(b.name)
      );
      return {
        categories: updatedCategories,
        lastId: state.lastId - 1,
      };
    }),
  updateCategory: (updatedCategory, oldId) =>
    set((state) => {
      const updatedCategories = state.categories
        .map((category) =>
          category.id === oldId ? { ...updatedCategory } : category
        )
        .sort((a, b) => a.name.localeCompare(b.name));
      return {
        categories: updatedCategories,
      };
    }),
  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
}));
