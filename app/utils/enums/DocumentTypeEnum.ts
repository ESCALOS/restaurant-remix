export enum DocumentTypeEnum {
  RUC = "RUC",
  DNI = "DNI",
  CE = "CE",
  PP = "PP",
}
export const DocumentTypeEnumLabels: Record<DocumentTypeEnum, string> = {
  [DocumentTypeEnum.RUC]: "Registro Único de Contribuyente",
  [DocumentTypeEnum.DNI]: "Documento Nacional de Identidad",
  [DocumentTypeEnum.CE]: "Carné de Extranjería",
  [DocumentTypeEnum.PP]: "Pasaporte",
};

export const DocumentTypeEnumColors: Record<DocumentTypeEnum, string> = {
  [DocumentTypeEnum.RUC]: "bg-emerald-500 text-white",
  [DocumentTypeEnum.DNI]: "bg-indigo-500 text-white",
  [DocumentTypeEnum.CE]: "bg-amber-500 text-white",
  [DocumentTypeEnum.PP]: "bg-fuchsia-500 text-white",
};
