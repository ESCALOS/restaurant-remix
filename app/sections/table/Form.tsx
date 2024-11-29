import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { Table } from "types";
import { z } from "zod";
import TextInput from "~/components/TextInput";

export const TableSchema = z.object({
  number: z.string().min(1, "El número de mesa debe tener al menos 1 caracter"),
});

// Tipo inferido de Zod para el formulario
export type TableFormInputs = z.infer<typeof TableSchema>;

type Props = {
  table?: Table;
  onSubmit: (data: TableFormInputs) => void;
  isSubmitting: boolean;
};

export default function Form({ table, onSubmit, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TableFormInputs>({
    defaultValues: {
      number: table?.number || "",
    },

    resolver: zodResolver(TableSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 mx-auto bg-white p-6 rounded-lg shadow-lg max-w-2xl"
    >
      <div className="flex items-center gap-2">
        <Link
          to="/admin/tables"
          className="rounded-full bg-primary-500 text-white hover:bg-primary-600"
        >
          <Icon icon="mdi:chevron-left" width="24" height="24" />
        </Link>
        <h2 className="text-xl font-semibold text-primary-900">
          {table ? "Editar Mesa" : "Registro de Mesa"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <TextInput
            id="number"
            label="Número de Mesa"
            {...register("number")}
            error={errors.number?.message}
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
