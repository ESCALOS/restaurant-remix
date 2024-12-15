import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { Kardex, Product } from "types";
import { z } from "zod";
import SelectInput from "~/components/SelectInput";
import TextInput from "~/components/TextInput";

export const KardexSchema = z.object({
  product_id: z.coerce
    .number()
    .min(1, "El producto del kardex debe ser mayor a 0"),
  quantity: z.coerce
    .number()
    .min(1, "La cantidad del kardex debe ser mayor a 0"),
  movement_type: z.enum(["INPUT", "OUTPUT"]),
  reason: z
    .string()
    .min(1, "La razón del kardex debe tener al menos 1 caracter"),
});

// Tipo inferido de Zod para el formulario
export type KardexFormInputs = z.infer<typeof KardexSchema>;

type Props = {
  kardex?: Kardex;
  products: Product[];
  onSubmit: (data: KardexFormInputs) => void;
  isSubmitting: boolean;
};

export default function Form({
  products,
  kardex,
  onSubmit,
  isSubmitting,
}: {
  products: Product[];
  kardex?: Kardex;
  onSubmit: (data: KardexFormInputs) => void;
  isSubmitting: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<KardexFormInputs>({
    defaultValues: {
      product_id: kardex?.product?.id || 0,
      quantity: kardex?.quantity || 0,
      movement_type: kardex?.movement_type || "INPUT",
      reason: kardex?.reason || "",
    },

    resolver: zodResolver(KardexSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 mx-auto bg-white p-6 rounded-lg shadow-lg max-w-2xl"
    >
      <div className="flex items-center gap-2">
        <Link
          to="/admin/kardex"
          className="rounded-full bg-primary-500 text-white hover:bg-primary-600"
        >
          <Icon icon="mdi:chevron-left" width="24" height="24" />
        </Link>
        <h2 className="text-xl font-semibold text-primary-900">
          {kardex ? "Editar Kardex" : "Registro de Kardex"}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <SelectInput
            id="product"
            label="Producto del Kardex"
            {...register("product_id")}
            options={products.map((product) => ({
              value: product.id,
              label: product.name,
            }))}
            error={errors.product_id?.message}
          />
        </div>
        <div>
          <TextInput
            id="quantity"
            label="Cantidad del Kardex"
            {...register("quantity")}
            error={errors.quantity?.message}
          />
        </div>
        <div>
          <SelectInput
            id="movement_type"
            label="Tipo de Movimiento"
            {...register("movement_type")}
            options={[
              { value: "INPUT", label: "Entrada" },
              { value: "OUTPUT", label: "Salida" },
            ]}
            error={errors.movement_type?.message}
          />
        </div>
        <div>
          <TextInput
            id="reason"
            label="Razón del Kardex"
            {...register("reason")}
            error={errors.reason?.message}
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
