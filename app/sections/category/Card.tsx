import React, { useEffect, useRef } from "react";
import { useFetcher } from "@remix-run/react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { useCategoryStore } from "~/store/categoryStore";
import { Category as CategoryType } from "types";
import { useLoadingStore } from "~/store/loadingStore";
import { motion } from "framer-motion";
import { useAnimateFeedbackCard } from "~/hooks/useAnimateFeedbackCard";

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
  const withLoading = useLoadingStore((state) => state.withLoading);
  const { controls, animate } = useAnimateFeedbackCard();

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
        toast.error(fetcher.data.error);
        animate("error");
        inputRef.current?.focus(); // Autofocus al input
        return;
      }
      if (fetcher.data.category) {
        updateCategory(
          { is_persistent: true, ...fetcher.data.category },
          category.id
        );
        toast.success(fetcher.data.message);
        animate("success");
        setIsEditing(false);
        return;
      }

      if (fetcher.data.message) {
        toast.success(fetcher.data.message); // Mensaje del servidor
        animate("success");
        deleteCategory(category.id); // Elimina del estado global
        return;
      }
    }
  }, [fetcher.data]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      if (!category.is_persistent) {
        deleteCategory(category.id);
      }
      setIsEditing(false);
    }
  };

  const handleSave = async () => {
    if (name.trim() === "") {
      toast.warning("El nombre de la categoría no puede estar vacío");
      animate("error");
      return;
    }

    //Verificar si el nombre ha cambiado
    if (category.name !== name) {
      const action = !category.is_persistent
        ? "/admin/categories/create"
        : `/admin/categories/${category.id}/edit`;
      await withLoading(async () => {
        await fetcher.submit({ name }, { method: "post", action });
      });
    } else {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    await withLoading(async () => {
      await fetcher.submit(null, {
        method: "post",
        action: `/admin/categories/${category.id}/destroy`,
      });
    });
  };

  return (
    <motion.div
      animate={controls}
      className="p-4 border rounded shadow hover:shadow-md transition select-none"
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
              onKeyDown={handleKeyDown}
              className="border px-2 py-1 rounded w-full"
            />
          </form>
        ) : (
          <span
            className="text-lg font-medium text-primary-900"
            onDoubleClick={() => setIsEditing(true)}
          >
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
                  onClick={() => deleteCategory(category.id)}
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
    </motion.div>
  );
};

export default CategoryCard;
