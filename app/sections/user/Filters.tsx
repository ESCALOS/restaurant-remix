import { UserFilters } from "~/hooks/useUserFilter";
import { RoleEnum, RoleEnumLabels } from "~/utils/enums/RoleEnum";

type Props = {
  filters: UserFilters;
  updateFilter: (key: keyof UserFilters, value: string) => void;
};

export default function Filters({ filters, updateFilter }: Props) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-primary-700"
        >
          Nombre o usuario
        </label>
        <input
          type="text"
          id="name"
          value={filters.name}
          onChange={(e) => updateFilter("name", e.target.value)}
          className="mt-1 block w-full rounded-md border border-primary-300 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
          placeholder="Buscar por nombre..."
        />
      </div>
      <div>
        <label
          htmlFor="document"
          className="block text-sm font-medium text-primary-700"
        >
          Número de documento
        </label>
        <input
          type="text"
          id="document"
          value={filters.document}
          onChange={(e) => updateFilter("document", e.target.value)}
          className="mt-1 block w-full rounded-md border border-primary-300 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
          placeholder="Buscar por documento..."
        />
      </div>
      <div>
        <label
          htmlFor="document_type"
          className="block text-sm font-medium text-primary-700"
        >
          Tipo de documento
        </label>
        <select
          id="document_type"
          value={filters.document_type}
          onChange={(e) => updateFilter("document_type", e.target.value)}
          className="mt-1 block w-full rounded-md border border-primary-300 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
        >
          <option value="">Todos</option>
          <option value="DNI">DNI</option>
          <option value="CE">CE</option>
          <option value="PP">PP</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-primary-700"
        >
          Rol
        </label>
        <select
          id="role"
          value={filters.role}
          onChange={(e) => updateFilter("role", e.target.value)}
          className="mt-1 block w-full rounded-md border border-primary-300 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
        >
          <option value="">Todos</option>
          <option value={RoleEnum.ADMIN}>{RoleEnumLabels.ADMIN}</option>
          <option value={RoleEnum.WAITER}>{RoleEnumLabels.WAITER}</option>
          <option value={RoleEnum.STOREKEEPER}>
            {RoleEnumLabels.STOREKEEPER}
          </option>
        </select>
      </div>
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-primary-700"
        >
          Estado
        </label>
        <select
          id="status"
          value={filters.status}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="mt-1 block w-full rounded-md border border-primary-300 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
        >
          <option value="">Todos</option>
          <option value="enabled">Activo</option>
          <option value="disabled">Inactivo</option>
        </select>
      </div>
    </div>
  );
}
