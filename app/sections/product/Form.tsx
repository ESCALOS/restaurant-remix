import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { Category, Product } from "types";
import { z } from "zod";
import SelectInput from "~/components/SelectInput";
import TextInput from "~/components/TextInput";

export const ProductSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre del producto debe tener al menos 1 caracter"),
  description: z
    .string()
    .min(1, "La descripción del producto debe tener al menos 1 caracter"),
  price: z.coerce.number().min(1, "El precio del producto debe ser mayor a 0"),
  category_id: z.coerce
    .number()
    .min(1, "La categoría del producto debe ser mayor a 0"),
  min_stock: z.coerce
    .number()
    .min(1, "El stock mínimo del producto debe ser mayor a 0"),
});

// Tipo inferido de Zod para el formulario
export type ProductFormInputs = z.infer<typeof ProductSchema>;

type Props = {
  product?: Product;
  categories: Category[];
  onSubmit: (data: ProductFormInputs) => void;
  isSubmitting: boolean;
};

export default function Form({
  categories,
  product,
  onSubmit,
  isSubmitting,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      category_id: product?.category?.id || 0,
      min_stock: product?.min_stock || 0,
    },

    resolver: zodResolver(ProductSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 mx-auto bg-white p-6 rounded-lg shadow-lg max-w-2xl"
    >
      <div className="flex items-center gap-2">
        <Link
          to="/admin/products"
          className="rounded-full bg-primary-500 text-white hover:bg-primary-600"
        >
          <Icon icon="mdi:chevron-left" width="24" height="24" />
        </Link>
        <h2 className="text-xl font-semibold text-primary-900">
          {product ? "Editar Producto" : "Registro de Producto"}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <TextInput
            id="name"
            label="Nombre del Producto"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>
        <div>
          <TextInput
            id="price"
            label="Precio del Producto"
            {...register("price")}
            error={errors.price?.message}
          />
        </div>
        <div className="md:col-span-2">
          <TextInput
            id="description"
            label="Descripción del Producto"
            {...register("description")}
            error={errors.description?.message}
          />
        </div>
        <div>
          <SelectInput
            id="category"
            label="Categoría del Producto"
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
            id="min_stock"
            label="Stock mínimo del Producto"
            {...register("min_stock")}
            error={errors.min_stock?.message}
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
