// TODO move to api.tsx
export interface Data {
  [key: string]: DataItem;
}

// TODO move to api.tsx
export interface DataItem  {
  [key: string]: DataItem | string | number | boolean | null | undefined | DataItem[] | string[] | number[];
  __typename: string;
}

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

export interface TypeInfo {
  typeName: string;
  typeClass: "leaf" | "object" | "list";
}

export function unwrapNonNull(fieldType: FieldMetadataType): FieldMetadataTypeExceptNonNull {
  if (fieldType.kind === "NON_NULL") {
    return unwrapNonNull(fieldType.ofType);
  } else {
    return fieldType;
  }
}

export function getMetadata(typeName: string, metadata: Metadata): MetadataType | null {
  const matchingMetadata = metadata.__schema.types.filter((item) => item.name === typeName);
  if (matchingMetadata.length === 0) {
    console.error("No field metadata found for: " + typeName);
    return null;
  } else if (matchingMetadata.length > 1) {
    console.error(`type '${typeName} appears more then once in the metadata array`, metadata);
    return matchingMetadata[0];
  } else {
    return matchingMetadata[0];
  }
}

export function assertNever(value: never): void {
  console.error("No case handled for ", value);
}
