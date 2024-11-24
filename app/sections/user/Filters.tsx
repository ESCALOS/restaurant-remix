import { UserFilters } from "~/hooks/useUserFilter";
import { RoleEnum, RoleEnumLabels } from "~/utils/enums/RoleEnum";
import TextInput from "../../components/TextInput";
import SelectInput from "../../components/SelectInput";

type Props = {
  filters: UserFilters;
  updateFilter: (key: keyof UserFilters, value: string) => void;
};

export default function Filters({ filters, updateFilter }: Props) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      <TextInput
        id="name"
        label="Nombre o usuario"
        value={filters.name}
        onChange={(e) => updateFilter("name", e.target.value)}
        placeholder="Buscar por nombre..."
      />
      <TextInput
        id="document"
        label="Número de documento"
        value={filters.document}
        onChange={(e) => updateFilter("document", e.target.value)}
        placeholder="Buscar por documento..."
      />
      <SelectInput
        id="document_type"
        label="Tipo de documento"
        value={filters.document_type}
        onChange={(e) => updateFilter("document_type", e.target.value)}
        options={[
          { value: "", label: "Todos" },
          { value: "DNI", label: "DNI" },
          { value: "CE", label: "CE" },
          { value: "PP", label: "PP" },
        ]}
      />
      <SelectInput
        id="role"
        label="Rol"
        value={filters.role}
        onChange={(e) => updateFilter("role", e.target.value)}
        options={[
          { value: "", label: "Todos" },
          { value: RoleEnum.ADMIN, label: RoleEnumLabels.ADMIN },
          { value: RoleEnum.WAITER, label: RoleEnumLabels.WAITER },
          { value: RoleEnum.STOREKEEPER, label: RoleEnumLabels.STOREKEEPER },
        ]}
      />
      <SelectInput
        id="status"
        label="Estado"
        value={filters.status}
        onChange={(e) => updateFilter("status", e.target.value)}
        options={[
          { value: "", label: "Todos" },
          { value: "enabled", label: "Activo" },
          { value: "disabled", label: "Inactivo" },
        ]}
      />
    </div>
  );
}
