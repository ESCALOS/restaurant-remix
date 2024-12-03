import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCategories } from "~/services/CategoryService";
import { Category as CategoryType } from "types";
import { useCategoryStore } from "~/store/categoryStore";
import { useEffect } from "react";
import CategoryCard from "~/sections/category/Card";
import { Icon } from "@iconify/react/dist/iconify.js";

export const loader: LoaderFunction = async ({ request }) => {
  const categories = await getCategories(request);
  return Response.json(categories);
};

export default function AdminCategoriesPage() {
  const loadCategories = useLoaderData<CategoryType[]>();

  const { categories, setInitialCategories, addCategory } = useCategoryStore();

  useEffect(() => {
    setInitialCategories(loadCategories);
  }, []);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-900">
          Gestión de Categorías
        </h1>
        <button
          className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-medium text-white hover:bg-accent-600"
          onClick={addCategory}
        >
          <Icon icon="tabler:category-plus" width="24" height="24" />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
