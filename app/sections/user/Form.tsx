import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icon } from "@iconify/react";
import { Link } from "@remix-run/react";
import { User } from "types";
import { RoleEnum, RoleEnumLabels } from "~/utils/enums/RoleEnum";

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
        <div className="space-y-2">
          <label className="block text-sm font-medium text-primary-800">
            Nombre de Usuario
          </label>
          <input
            {...register("username")}
            className={`w-full p-3 border rounded-lg ${
              errors.username ? "border-red-500" : "border-secondary-300"
            }`}
            type="text"
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-primary-800">
            Nombre Completo
          </label>
          <input
            {...register("name")}
            className={`w-full p-3 border rounded-lg ${
              errors.name ? "border-red-500" : "border-secondary-300"
            }`}
            type="text"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-primary-800">
            Tipo de Documento
          </label>
          <select
            {...register("document_type")}
            className={`w-full p-3 border rounded-lg ${
              errors.document_type ? "border-red-500" : "border-secondary-300"
            }`}
          >
            <option value="DNI">DNI</option>
            <option value="CE">CE</option>
            <option value="PP">PP</option>
          </select>
          {errors.document_type && (
            <p className="text-sm text-red-500">
              {errors.document_type.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-primary-800">
            Número de Documento
          </label>
          <input
            {...register("document_number")}
            className={`w-full p-3 border rounded-lg ${
              errors.document_number ? "border-red-500" : "border-secondary-300"
            }`}
            type="text"
          />
          {errors.document_number && (
            <p className="text-sm text-red-500">
              {errors.document_number.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-primary-800">
            Teléfono
          </label>
          <input
            {...register("phone")}
            className={`w-full p-3 border rounded-lg ${
              errors.phone ? "border-red-500" : "border-secondary-300"
            }`}
            type="text"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-primary-800">
            Rol
          </label>
          <select
            {...register("role")}
            className={`w-full p-3 border rounded-lg ${
              errors.role ? "border-red-500" : "border-secondary-300"
            }`}
          >
            <option value={RoleEnum.ADMIN}>
              {RoleEnumLabels[RoleEnum.ADMIN]}
            </option>
            <option value={RoleEnum.WAITER}>
              {RoleEnumLabels[RoleEnum.WAITER]}
            </option>
            <option value={RoleEnum.STOREKEEPER}>
              {RoleEnumLabels[RoleEnum.STOREKEEPER]}
            </option>
          </select>
          {errors.role && (
            <p className="text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>
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
