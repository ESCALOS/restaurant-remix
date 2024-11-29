import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { Category, Dish } from "types";
import { z } from "zod";
import SelectInput from "~/components/SelectInput";
import TextInput from "~/components/TextInput";

export const DishSchema = z.object({
  name: z.string().min(1, "El nombre del plato debe tener al menos 1 caracter"),
  description: z
    .string()
    .min(1, "La descripción del plato debe tener al menos 1 caracter"),
  price: z.coerce.number().min(1, "El precio del plato debe ser mayor a 0"),
  category_id: z.coerce
    .number()
    .min(1, "La categoría del plato debe ser mayor a 0"),
});

// Tipo inferido de Zod para el formulario
export type DishFormInputs = z.infer<typeof DishSchema>;

type Props = {
  dish?: Dish;
  categories: Category[];
  onSubmit: (data: DishFormInputs) => void;
  isSubmitting: boolean;
};

export default function Form({
  categories,
  dish,
  onSubmit,
  isSubmitting,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DishFormInputs>({
    defaultValues: {
      name: dish?.name || "",
      description: dish?.description || "",
      price: dish?.price || 0,
      category_id: dish?.category?.id || 0,
    },

    resolver: zodResolver(DishSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 mx-auto bg-white p-6 rounded-lg shadow-lg max-w-2xl"
    >
      <div className="flex items-center gap-2">
        <Link
          to="/admin/dishes"
          className="rounded-full bg-primary-500 text-white hover:bg-primary-600"
        >
          <Icon icon="mdi:chevron-left" width="24" height="24" />
        </Link>
        <h2 className="text-xl font-semibold text-primary-900">
          {dish ? "Editar Plato" : "Registro de Plato"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <TextInput
            id="name"
            label="Nombre del Plato"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>
        <div className="md:col-span-2">
          <TextInput
            id="description"
            label="Descripción del Plato"
            {...register("description")}
            error={errors.description?.message}
          />
        </div>
        <div>
          <SelectInput
            id="category"
            label="Categoría del Plato"
            {...register("category_id")}
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            error={errors.category_id?.message}
          />
        </div>

        <div>
          <TextInput
            id="price"
            label="Precio del Plato"
            {...register("price")}
            error={errors.price?.message}
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
