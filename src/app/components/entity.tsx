import * as React from "react";
import {assertNever, ComponentType, Data, DataItem, getType, Metadata, MetadataType} from "../support/graphqlHelpers";
interface ComponentMappings {
  [key: string]: {
    default: Component,
    options: Component[],
  };
}

// TODO remove fieldName parameter
type Component = (props: ComponentArguments) => JSX.Element;

export interface ComponentArguments {
  data: any;
  metadata: Metadata;
  componentMappings: ComponentMappings;
}

export function Entity(props: {data: Data, metadata: Metadata, componentMappings: ComponentMappings}): JSX.Element {
  const data = props.data;
  const subComponents: JSX.Element[] = [];
  for (const key in data) {
    if (data[key] != null) {
      const dataItem: DataItem = data[key];
      const renderFunction: Component = getComponentFromMappings(
        {name: dataItem.__typename, type: "object"}, 
        props.componentMappings,
      );
      subComponents.push(renderFunction(
        {data: dataItem, metadata: props.metadata, componentMappings: props.componentMappings},
      ));
    }
  }
  return DefaultCompositeComponent(subComponents);
}

function DefaultScalarComponent(props: ComponentArguments): JSX.Element {
  const value = props.data;
  return <span>{value}<br/></span>;
}

function DefaultListComponent(props: ComponentArguments): JSX.Element {
  const propElements: JSX.Element[] = [];
  const value = props.data;
  if (value != null && value instanceof Array) {
    for (const key in value) {
      if (value[key] != null) {
        const item = value[key];
      }
    }
  }


  return <ul>{propElements}</ul>;
}

function DefaultObjectComponent(props: ComponentArguments): JSX.Element {
  const properties = renderDataItem(props);
  const propElements: JSX.Element[] = [];
  
  for (const key in properties) {
      if (properties[key] != null) {
        propElements.push(<span>{key}: {properties[key]}</span>);
      }
  }

  return (<div>
    {propElements}
  </div>);
}

function DefaultCompositeComponent(subComponents: JSX.Element[]): JSX.Element {
  return <div>{subComponents}</div>;
}

function getComponentFromMappings(type: ComponentType, mappings: ComponentMappings): Component {
  if (type.type !== "list" && type.name in mappings) {
    return mappings[type.name].default;
  } else {
    switch (type.type) {
      case "leaf":
        return DefaultScalarComponent;
      case "list":
        return DefaultListComponent;
      case "object":
        return DefaultObjectComponent;
      default:
        assertNever(type.type);
    }
  }
  console.error("We should never get here");
  return DefaultScalarComponent;
}

function renderDataItem({data, metadata, componentMappings}: ComponentArguments): {[key: string]: JSX.Element} {
  const properties: {[key: string]: JSX.Element} = {};
  const typeName: string = data.__typename;
  const matchingMetadata = metadata.__schema.types.filter((item) => item.name === typeName);

  if (matchingMetadata.length > 0) { 
    const metaDataType: MetadataType = matchingMetadata[0];
    if (metaDataType.fields !== null) {
      for (const propKey in data) {
        if (propKey === "__typename") {
          continue;
        }
        const fieldMetadataMatches = metaDataType.fields.filter((field) => field.name === propKey);
        if (fieldMetadataMatches.length > 0) {
          const fieldMetadata = fieldMetadataMatches[0];
          const renderComponent = getComponentFromMappings(getType(fieldMetadata.type), componentMappings);
          properties[propKey] = renderComponent({data: data[propKey], metadata, componentMappings});
        } else {
          console.error("No field metadata found for: " + propKey);
        }
      }
    }
  } else {
    console.error("No metadata found for: " + typeName);
  }

  return properties;
}

/*
  - [x] rendert een leaf field als tekst
  - [x] rendert een leaf field als de componentMapping if provided, anders als tekst
  - [x] rendert een non-leaf field recursief
  - [x] rendert een non-leaf field als de componentMapping if provided, anders recursief
  - [ ] voeg  defaultLeaffield en defaultNonLeaffield properties toe
*/
