import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { Category } from "types";
import { z } from "zod";
import TextInput from "~/components/TextInput";

export const CategorySchema = z.object({
  name: z
    .string()
    .min(1, "El nombre de la categoría debe tener al menos 1 caracter"),
});

// Tipo inferido de Zod para el formulario
export type CategoryFormInputs = z.infer<typeof CategorySchema>;

type Props = {
  category?: Category;
  onSubmit: (data: CategoryFormInputs) => void;
  isSubmitting: boolean;
};

export default function Form({ category, onSubmit, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormInputs>({
    defaultValues: {
      name: category?.name || "",
    },

    resolver: zodResolver(CategorySchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 mx-auto bg-white p-6 rounded-lg shadow-lg max-w-2xl"
    >
      <div className="flex items-center gap-2">
        <Link
          to="/admin/categories"
          className="rounded-full bg-primary-500 text-white hover:bg-primary-600"
        >
          <Icon icon="mdi:chevron-left" width="24" height="24" />
        </Link>
        <h2 className="text-xl font-semibold text-primary-900">
          {category ? "Editar Categoría" : "Registro de Categoría"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <TextInput
            id="name"
            label="Nombre de la Categoría"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-400 transition"
      >
        {isSubmitting ? "Registrando..." : "Registrar"}
      </button>
    </form>
  );
}
