import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icon } from "@iconify/react";
import { Link } from "@remix-run/react";
import { User } from "types";
import { RoleEnum, RoleEnumLabels } from "~/utils/enums/RoleEnum";
import TextInput from "~/components/TextInput";
import SelectInput from "~/components/SelectInput";
import { DocumentTypeEnum } from "~/utils/enums/DocumentTypeEnum";

const documentTypeEnumValues = [
  DocumentTypeEnum.DNI,
  DocumentTypeEnum.CE,
  DocumentTypeEnum.PP,
] as const;

const roleEnumValues = [
  RoleEnum.ADMIN,
  RoleEnum.WAITER,
  RoleEnum.STOREKEEPER,
] as const;

export const UserSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),

  document_type: z.enum(documentTypeEnumValues, {
    required_error: "El tipo de documento es requerido",
  }),

  email: z
    .string()
    .email("El email no es válido")
    .min(3, "El email debe tener al menos 3 caracteres")
    .max(15, "El email no debe exceder los 15 caracteres"),

  document_number: z
    .string()
    .min(8, "El número de documento debe tener al menos 8 caracteres")
    .max(15, "El número de documento no debe exceder los 15 caracteres"),

  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),

  phone: z
    .string()
    .min(6, "El teléfono debe tener al menos 6 caracteres")
    .max(15, "El teléfono no debe exceder los 15 caracteres"),

  role: z.enum(roleEnumValues, {
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
  } = useForm<UserFormInputs>({
    defaultValues: {
      username: user?.username || "",
      document_number: user?.document_number || "",
      document_type: user?.document_type || DocumentTypeEnum.DNI,
      name: user?.name || "",
      phone: user?.phone || "",
      role: user?.role || RoleEnum.WAITER,
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
        <div className="md:col-span-2">
          <TextInput
            id="name"
            label="Nombre Completo"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>

        <TextInput
          id="username"
          label="Nombre de Usuario"
          {...register("username")}
          error={errors.username?.message}
        />

        <TextInput
          id="email"
          label="Email"
          {...register("email")}
          error={errors.email?.message}
        />

        <SelectInput
          id="document_type"
          label="Tipo de Documento"
          {...register("document_type")}
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
          {...register("document_number")}
          error={errors.document_number?.message}
        />

        <TextInput
          id="phone"
          label="Teléfono"
          {...register("phone")}
          error={errors.phone?.message}
        />

        <SelectInput
          id="role"
          label="Rol"
          {...register("role")}
          options={[
            { value: RoleEnum.ADMIN, label: RoleEnumLabels[RoleEnum.ADMIN] },
            { value: RoleEnum.WAITER, label: RoleEnumLabels[RoleEnum.WAITER] },
            {
              value: RoleEnum.STOREKEEPER,
              label: RoleEnumLabels[RoleEnum.STOREKEEPER],
            },
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
