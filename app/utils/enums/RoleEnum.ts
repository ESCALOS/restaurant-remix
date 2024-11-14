// Enum para definir los roles de usuario
export enum RoleEnum {
  ADMIN = "ADMIN",
  WAITER = "WAITER",
  STOREKEEPER = "STOREKEEPER",
}

export const RoleEnumValues = Object.values(RoleEnum);

export const RoleEnumLabels: Record<RoleEnum, string> = {
  [RoleEnum.ADMIN]: "Administrador",
  [RoleEnum.WAITER]: "Mozo",
  [RoleEnum.STOREKEEPER]: "Almacenero",
};

export const RoleEnumColors: Record<RoleEnum, string> = {
  [RoleEnum.ADMIN]: "bg-blue-500 text-white",
  [RoleEnum.WAITER]: "bg-rose-500 text-white",
  [RoleEnum.STOREKEEPER]: "bg-amber-500 text-white",
};
