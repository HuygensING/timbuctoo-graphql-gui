import * as React from "react";
import {
  assertNever,
  Data,
  DataItem,
  FieldMetadataType,
  Metadata,
  MetadataType,
  unwrapNonNull,
} from "../support/graphqlHelpers";
interface ComponentMappings {
  [key: string]: {
    default: Component,
    options: Component[],
  };
}

interface ComponentRenderConfiguration {
  renderer: Component;
}

interface ObjectRenderConfiguration {
  [key: string]: RenderConfiguration;
}

export type RenderConfiguration = ComponentRenderConfiguration | ObjectRenderConfiguration;

type Component = (props: ComponentArguments) => JSX.Element;
type ListComponent = (props: ComponentArguments, subtype: FieldMetadataType) => JSX.Element;

export interface ComponentArguments {
  data: any;
  metadata: Metadata;
  componentMappings: ComponentMappings;
  defaultRelatedComponent: Component;
  defauldScalarComponent: Component;
  defaultListComponent: ListComponent;
  renderConfiguration?: RenderConfiguration;
}

export function Entity(props: {
    data: Data,
    metadata: Metadata,
    componentMappings: ComponentMappings,
    defaultRelatedComponent?: Component,
    defaultScalarComponent?: Component,
    defaultListComponent?: ListComponent,
    renderConfiguration?: RenderConfiguration,
  }): JSX.Element {
  const data = props.data;
  const subComponents: JSX.Element[] = [];
  const defaultRelatedComponent = props.defaultRelatedComponent != null ?
    props.defaultRelatedComponent : DefaultObjectComponent;
  const defauldScalarComponent = props.defaultScalarComponent != null ?
    props.defaultScalarComponent : DefaultScalarComponent;
  const defaultListComponent = props.defaultListComponent != null ?
    props.defaultListComponent : DefaultListComponent;

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const dataItem: DataItem = data[key];
      const renderFunction = renderFunctionOrDefault(
        dataItem.__typename,
        props.componentMappings,
        DefaultObjectComponent,
        props.renderConfiguration,
      );

      subComponents.push(renderFunction(
        {
          data: dataItem,
          metadata: props.metadata,
          componentMappings: props.componentMappings,
          defaultRelatedComponent,
          defauldScalarComponent,
          defaultListComponent,
          renderConfiguration: getRenderConfiguration(key, props.renderConfiguration),
        },
      ));
    }
  }
  return DefaultCompositeComponent(subComponents);
}

function DefaultScalarComponent(props: ComponentArguments): JSX.Element {
  const value = props.data;
  return <span>{value}<br/></span>;
}

function DefaultListComponent(props: ComponentArguments, subtype: FieldMetadataType): JSX.Element {
  const propElements: JSX.Element[] = [];
  const value = props.data;
  if (value && typeof value.map === "function") {
    // this is either a list of leaf nodes, objects, or lists.
    // we don't do lists of lists in this component
    return <ul>{value.map((item: any) => <li>{renderField({...props, data: item}, subtype)}</li>)}</ul>;
  } else {
    console.error("data of type list is not an array!", value);
    return <ul></ul>;
  }

}

function DefaultObjectComponent(props: ComponentArguments): JSX.Element {
  const properties = renderItemFields(props);

  return (<div>
    {Object.keys(properties).sort().map((key) => <span>{key}: {properties[key]}</span>)}
  </div>);
}

function DefaultCompositeComponent(subComponents: JSX.Element[]): JSX.Element {
  return <div>{subComponents}</div>;
}

function getMetadata(typeName: string, metadata: Metadata): MetadataType | null {
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

export function renderItemFields({
  data,
  metadata,
  componentMappings,
  defaultRelatedComponent,
  defauldScalarComponent,
  defaultListComponent,
  renderConfiguration,
}: ComponentArguments): {[key: string]: JSX.Element} {
  const properties: {[key: string]: JSX.Element} = {};
  const metaDataType = getMetadata(data.__typename, metadata);

  if (metaDataType && metaDataType.fields != null) {
    for (const propKey in data) {
      if (propKey === "__typename") {
        continue;
      }
      const fieldRenderConf = getRenderConfiguration(propKey, renderConfiguration);

      const fieldMetadataMatches = metaDataType.fields.filter((field) => field.name === propKey);
      if (fieldMetadataMatches.length > 0) {
        properties[propKey] = renderField({
          data: data[propKey],
          metadata,
          componentMappings,
          defaultRelatedComponent,
          defauldScalarComponent,
          defaultListComponent,
          renderConfiguration: fieldRenderConf,
        }, fieldMetadataMatches[0].type);
      } else {
        console.error("No field metadata found for: " + propKey);
      }
    }
  }

  return properties;
}

function getRenderConfiguration(fieldName: string, renderConfiguration?: RenderConfiguration)
: RenderConfiguration | undefined {
  if (isObjectRenderConfiguration(renderConfiguration) && renderConfiguration.hasOwnProperty(fieldName)) {
        return renderConfiguration[fieldName];
  }
  return undefined;
}

/**
 * renders the data given: data object, fieldName, metadata object of parent
 */
export function renderField(props: ComponentArguments, fieldMetadata: FieldMetadataType): JSX.Element {
  const unwrapped = unwrapNonNull(fieldMetadata);
  switch (unwrapped.kind) {
    case "ENUM":
    case "SCALAR":
      return renderFunctionOrDefault(
        unwrapped.name,
        props.componentMappings,
        props.defauldScalarComponent,
        props.renderConfiguration,
    )(props);
    case "OBJECT":
    case "UNION":
    case "INTERFACE":
      return renderFunctionOrDefault(
        props.data.__typename,
        props.componentMappings,
        props.defaultRelatedComponent,
        props.renderConfiguration,
    )(props);
    case "LIST":
      return props.defaultListComponent(props, unwrapped.ofType);
    default:
      assertNever(unwrapped);
      return <span className="should not appear"></span>;
  }
}

function renderFunctionOrDefault(
  key: string,
  mappings: ComponentMappings,
  defaultComponent: Component,
  renderConfiguration?: RenderConfiguration,
): Component {
  if (renderConfiguration != null && isComponentRenderConfiguration(renderConfiguration)) {
    return renderConfiguration.renderer;
  }
  if (key in mappings) {
    return mappings[key].default;
  } else {
    return defaultComponent;
  }
}

function isComponentRenderConfiguration(renderConfiguration?: RenderConfiguration):
  renderConfiguration is ComponentRenderConfiguration {
  // TODO: check if type of the renderer is Component
  return renderConfiguration != null &&
  renderConfiguration.hasOwnProperty("renderer");
}

function isObjectRenderConfiguration(renderConfiguration?: RenderConfiguration):
  renderConfiguration is ObjectRenderConfiguration {

  return renderConfiguration != null &&
  !renderConfiguration.hasOwnProperty("renderer");
}
