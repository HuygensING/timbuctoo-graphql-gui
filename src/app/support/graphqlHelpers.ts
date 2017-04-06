
export interface Data {
  [key: string]: DataItem;
}

export interface DataItem  {
  [key: string]: DataItem | string | number | boolean | null | undefined | DataItem[] | string[] | number[];
  __typename: string;
}

export interface Metadata {
  __schema: {
    types: MetadataType[];
  };
}

export interface MetadataType {
  name: string;
  kind: string;
  enumValues: EnumValue[] | null;
  fields: MetadataField[] | null;
}

interface EnumValue {
  name: string;
}

interface MetadataField {
  name: string;
  type: NonNestedFieldType | ListFieldType | NonNullFieldType;
}

interface NonNestedFieldType {
  name: string;
  kind: "SCALAR" | "ENUM" | "OBJECT" | "INTERFACE" | "UNION";
  ofType?: null;
}

interface ListFieldType {
  name?: null;
  kind: "LIST";
  ofType: NonNestedFieldType | ListFieldType | NonNullFieldType;
}

interface NonNullFieldType {
  name?: null;
  kind: "NON_NULL";
  ofType: NonNestedFieldType | ListFieldType | NonNullFieldType;
}

export interface ComponentType {
  name: string;
  type: "leaf" | "object" | "list";
  ofType?: ComponentType;
}

export function getType(fieldType: NonNestedFieldType | ListFieldType | NonNullFieldType): ComponentType {
  if (fieldType.kind === "LIST") {
    const ofType = getType(fieldType.ofType)
    return {type: "list", name: ofType.name, ofType};
  } else if (fieldType.kind === "SCALAR") {
    return {type: "leaf", name: fieldType.name};
  } else if (fieldType.kind === "NON_NULL") {
    return getType(fieldType.ofType);
  } else {
    return {name: fieldType.name, type: "object"};
  }
}

export function assertNever(value: never): void {
  console.error("No case handled for ", value);
}
