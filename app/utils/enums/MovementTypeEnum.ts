export enum MovementTypeEnum {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}
export const MovementTypeEnumLabels: Record<MovementTypeEnum, string> = {
  [MovementTypeEnum.INPUT]: "Entrada",
  [MovementTypeEnum.OUTPUT]: "Salida",
};

export const MovementTypeEnumColors: Record<MovementTypeEnum, string> = {
  [MovementTypeEnum.INPUT]: "bg-emerald-500 text-white",
  [MovementTypeEnum.OUTPUT]: "bg-amber-500 text-white",
};
