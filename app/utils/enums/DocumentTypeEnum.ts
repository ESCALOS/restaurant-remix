export enum DocumentTypeEnum {
  RUC = "RUC",
  DNI = "DNI",
  CE = "CE",
  PP = "PP",
}
// Colores y etiquetas para los tipos de documento
export const DocumentTypeEnumLabels: Record<DocumentTypeEnum, string> = {
  [DocumentTypeEnum.RUC]: "Registro Único de Contribuyente",
  [DocumentTypeEnum.DNI]: "Documento Nacional de Identidad",
  [DocumentTypeEnum.CE]: "Carné de Extranjería",
  [DocumentTypeEnum.PP]: "Pasaporte",
};

export const DocumentTypeEnumColors: Record<DocumentTypeEnum, string> = {
  [DocumentTypeEnum.RUC]: "bg-green-500 text-white",
  [DocumentTypeEnum.DNI]: "bg-blue-500 text-white",
  [DocumentTypeEnum.CE]: "bg-yellow-500 text-black",
  [DocumentTypeEnum.PP]: "bg-purple-500 text-white",
};
