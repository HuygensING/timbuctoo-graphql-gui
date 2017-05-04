import * as React from "react";

export interface DataRenderer {
  count(): number; // number of fields in an array
  fields(): string[]; // returns an empty array if the DataRenderer has no fields
  getData(): any;
  renderField(fieldName: string | number): JSX.Element; // returns an empty span for unknown fields
  subRenderer(fieldName: string): DataRenderer; // returns a null DataRenderer for unknown field
}

export interface TimComponent {
  render(datarenderer: DataRenderer): JSX.Element;
}

export function Entity(props: {datarenderer: DataRenderer}): JSX.Element {
  const properties: JSX.Element[] = [];

  for (const field of props.datarenderer.fields()) {
      properties.push(props.datarenderer.renderField(field));
  }

  return <div>{properties}</div>;
}

// TODO remove from graphqlhelpers
export interface Data {
  [key: string]: DataItem;
}

// TODO remove from graphqlhelpers
export interface DataItem  {
  [key: string]: DataItem | string | number | boolean | null | undefined | DataItem[] | string[] | number[];
  __typename: string;
}
