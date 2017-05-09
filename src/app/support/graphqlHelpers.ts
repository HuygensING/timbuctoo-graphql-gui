export interface Metadata {
  __schema: {
    types: MetadataType[];
  };
}

export type MetadataType =
  ObjectMetadataType |
  InterfaceMetadataType |
  EnumMetadataType |
  ScalarMetadataType |
  UnionMetadataType |
  ListMetadataType |
  NonNullMetadataType |
  InputObjectMetadataType;

export type FieldMetadataType =
  FieldMetadataTypeExceptNonNull |
  NonNullMetadataType;

export type FieldMetadataTypeExceptNonNull =
  ObjectMetadataTypeInField |
  InterfaceMetadataTypeInField |
  EnumMetadataTypeInField |
  ScalarMetadataType |
  UnionMetadataType |
  ListMetadataType;

interface MetadataField {
  name: string;
  type: FieldMetadataType;
}

interface EnumValue {
  name: string;
}

export interface ObjectMetadataType {
  name: string;
  kind: "OBJECT";
  fields: MetadataField[];

  enumValues?: null;
  ofType?: null;
}

export interface InterfaceMetadataType {
  name: string;
  kind: "INTERFACE";
  fields: MetadataField[];

  enumValues?: null;
  ofType?: null;
}

export interface ObjectMetadataTypeInField {
  name: string;
  kind: "OBJECT";

  ofType?: null;
}
export interface InterfaceMetadataTypeInField {
  name: string;
  kind: "INTERFACE";

  ofType?: null;
}

export interface EnumMetadataTypeInField {
  name: string;
  kind: "ENUM";

  ofType?: null;
}

export interface ScalarMetadataType {
  name: string;
  kind: "SCALAR";

  fields?: null;
  enumValues?: null;
  ofType?: null;
}

export interface UnionMetadataType {
  name: string;
  kind: "UNION";

  fields?: null;
  enumValues?: null;
  ofType?: null;
}

export interface EnumMetadataType {
  name: string;
  kind: "ENUM";
  enumValues: EnumValue[];

  fields?: null;
  ofType?: null;
}

export interface ListMetadataType {
  name?: null;
  kind: "LIST";
  ofType: FieldMetadataType;

  fields?: null;
  enumValues?: null;
}

export interface NonNullMetadataType {
  name?: null;
  kind: "NON_NULL";
  ofType: FieldMetadataType;

  fields?: null;
  enumValues?: null;
}

export interface InputObjectMetadataType {
  name: string;
  kind: "INPUT_OBJECT";

  fields?: null;
  enumValues?: null;
}

export function unwrapNonNull(fieldType: FieldMetadataType): FieldMetadataTypeExceptNonNull {
  if (fieldType.kind === "NON_NULL") {
    return unwrapNonNull(fieldType.ofType);
  } else {
    return fieldType;
  }
}

export function convertToMetadataType(fieldMetadataType: FieldMetadataType, metadata: Metadata): MetadataType | null {
  const unwrapped = unwrapNonNull(fieldMetadataType);
  switch (unwrapped.kind) {
    case "SCALAR":
    case "UNION":
    case "LIST":
      return unwrapped;
    case "OBJECT":
    case "INTERFACE":
    case "ENUM":
      return getMetadata(unwrapped.name, metadata);
    default:
      return null;
  }
}

export function getMetadata(typeName: string, metadata: Metadata): MetadataType | null {
  const matchingMetadata = metadata.__schema.types.filter((item) => item.name === typeName);
  if (matchingMetadata.length === 0) {
    console.error("No metadata found for type: " + typeName);
    return null;
  } else if (matchingMetadata.length > 1) {
    console.error(`type '${typeName} appears more then once in the metadata array`, metadata);
    return matchingMetadata[0];
  } else {
    return matchingMetadata[0];
  }
}

export function isListMetadata(metadataType: MetadataType | FieldMetadataType): metadataType is ListMetadataType {
  return metadataType != null && metadataType.kind === "LIST";
}

export function assertNever(value: never): void {
  console.error("No case handled for ", value);
}
