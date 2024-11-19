import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icon } from "@iconify/react";
import { Link } from "@remix-run/react";
import { User } from "types";
import { RoleEnum, RoleEnumLabels } from "~/utils/enums/RoleEnum";
import TextInput from "~/components/TextInput";
import SelectInput from "~/components/SelectInput";

export const UserSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),

  document_type: z.enum(["DNI", "CE", "PP"], {
    required_error: "El tipo de documento es requerido",
  }),

  document_number: z
    .string()
    .min(8, "El número de documento debe tener al menos 8 caracteres")
    .max(15, "El número de documento no debe exceder los 15 caracteres"),

  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),

  phone: z
    .string()
    .min(6, "El teléfono debe tener al menos 6 caracteres")
    .max(15, "El teléfono no debe exceder los 15 caracteres"),

  role: z.enum(["ADMIN", "WAITER", "STOREKEEPER"], {
    required_error: "El rol es requerido",
  }),
});

// Tipo inferido de Zod para el formulario
export type UserFormInputs = z.infer<typeof UserSchema>;

type Props = {
  user?: User;
  onSubmit: (data: UserFormInputs) => void;
  isSubmitting: boolean;
};

export default function Form({ user, onSubmit, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UserFormInputs>({
    defaultValues: {
      username: user?.username || "",
      document_number: user?.document_number || "",
      document_type: user?.document_type || "DNI",
      name: user?.name || "",
      phone: user?.phone || "",
      role: user?.role || "WAITER",
    },

    resolver: zodResolver(UserSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 mx-auto bg-white p-6 rounded-lg shadow-lg max-w-2xl"
    >
      <div className="flex items-center gap-2">
        <Link
          to="/admin/users"
          className="rounded-full bg-primary-500 text-white hover:bg-primary-600"
        >
          <Icon icon="mdi:chevron-left" width="24" height="24" />
        </Link>
        <h2 className="text-xl font-semibold text-primary-900">
          {user ? "Editar Usuario" : "Registro de Usuario"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          id="username"
          label="Nombre de Usuario"
          value={getValues("username")}
          onChange={register("username").onChange}
          error={errors.username?.message}
        />

        <TextInput
          id="name"
          label="Nombre Completo"
          value={getValues("name")}
          onChange={register("name").onChange}
          error={errors.name?.message}
        />

        <SelectInput
          id="document_type"
          label="Tipo de Documento"
          value={getValues("document_type")}
          onChange={register("document_type").onChange}
          options={[
            { value: "DNI", label: "DNI" },
            { value: "CE", label: "CE" },
            { value: "PP", label: "PP" },
          ]}
          error={errors.document_type?.message}
        />

        <TextInput
          id="document_number"
          label="Número de Documento"
          value={getValues("document_number")}
          onChange={register("document_number").onChange}
          error={errors.document_number?.message}
        />

        <TextInput
          id="phone"
          label="Teléfono"
          value={getValues("phone")}
          onChange={register("phone").onChange}
          error={errors.phone?.message}
        />

        <SelectInput
          id="role"
          label="Rol"
          value={getValues("role")}
          onChange={register("role").onChange}
          options={[
            { value: RoleEnum.ADMIN, label: RoleEnumLabels[RoleEnum.ADMIN] },
            { value: RoleEnum.WAITER, label: RoleEnumLabels[RoleEnum.WAITER] },
            { value: RoleEnum.STOREKEEPER, label: RoleEnumLabels[RoleEnum.STOREKEEPER] },
          ]}
          error={errors.role?.message}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600"
      >
        {isSubmitting ? "Registrando..." : "Registrar"}
      </button>
    </form>
  );
}
