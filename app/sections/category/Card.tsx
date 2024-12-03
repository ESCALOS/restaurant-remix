import React, { useEffect, useRef } from "react";
import { useFetcher } from "@remix-run/react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { useCategoryStore } from "~/store/categoryStore";
import { Category as CategoryType } from "types";
import { useLoadingStore } from "~/store/loadingStore";

interface CategoryCardProps {
  category: CategoryType & { is_persistent: boolean };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const fetcher = useFetcher<{
    category?: CategoryType;
    error?: string;
    message?: string;
  }>();
  const { updateCategory, deleteCategory } = useCategoryStore();
  const [isEditing, setIsEditing] = React.useState(!category.is_persistent);
  const [name, setName] = React.useState(category.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus(); // Autofocus al input
    }

    if (!isEditing && name.trim() === "") {
      setName(category.name);
    }
  }, [isEditing]);

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        toast.warning(fetcher.data.error);
        inputRef.current?.focus(); // Autofocus al input
        return;
      }
      if (fetcher.data.category) {
        updateCategory(
          { is_persistent: true, ...fetcher.data.category },
          category.id
        );
        toast.success(fetcher.data.message);
        setIsEditing(false);
        return;
      }
    }
  }, [fetcher.data, updateCategory]);

  const handleSave = async () => {
    if (name.trim() === "") {
      toast.error("El nombre de la categoría no puede estar vacío");
      return;
    }

    const action = !category.is_persistent
      ? "/admin/categories/create"
      : `/admin/categories/${category.id}/edit`;

    setLoading(true);
    await fetcher.submit({ name }, { method: "post", action });
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await fetcher.submit(null, {
      method: "delete",
      action: `/admin/categories/${category.id}/destroy`,
    });
    setLoading(false);
    deleteCategory(category.id);
  };

  return (
    <div
      className="p-4 border rounded shadow hover:shadow-md transition select-none"
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="flex items-center justify-between">
        {isEditing ? (
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          </form>
        ) : (
          <span className="text-lg font-medium text-primary-900">
            {category.name || "Nueva Categoría"}
          </span>
        )}
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                className="text-green-500 hover:text-green-600"
                onClick={handleSave}
              >
                <Icon className="h-5 w-5" icon="tabler:check" />
              </button>
              {category.is_persistent ? (
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => setIsEditing(false)}
                >
                  <Icon className="h-5 w-5" icon="tabler:x" />
                </button>
              ) : (
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={handleDelete}
                >
                  <Icon className="h-5 w-5" icon="tabler:trash" />
                </button>
              )}
            </>
          ) : (
            <>
              <button
                className="text-accent-500 hover:text-accent-600"
                onClick={() => setIsEditing(true)}
              >
                <Icon className="h-5 w-5" icon="tabler:pencil" />
              </button>
              <button
                className="text-red-500 hover:text-red-600"
                onClick={handleDelete}
              >
                <Icon className="h-5 w-5" icon="tabler:trash" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
