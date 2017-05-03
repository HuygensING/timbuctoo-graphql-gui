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
  };
}

interface ComponentOverrideConfiguration {
  renderer: Component;
}

interface ListComponentOverrideConfiguration {
  listRenderer: ListComponent;
}

interface ObjectOverrideConfiguration {
  [key: string]: OverrideConfig;
}

export type OverrideConfig =
  ComponentOverrideConfiguration |
  ObjectOverrideConfiguration |
  ListComponentOverrideConfiguration;

interface RenderConfig {
  overrides?: OverrideConfig;
  type: ComponentMappings;
}

type Component = (props: ComponentArguments) => JSX.Element;
export type ListComponent = (props: ComponentArguments, subtype: FieldMetadataType) => JSX.Element;

export interface ComponentArguments {
  data: any;
  metadata: Metadata;
  defaultRelatedComponent: Component;
  defaultScalarComponent: Component;
  defaultListComponent: ListComponent;
  renderConfig: RenderConfig;
}

export function Entity(props: {
    data: Data,
    metadata: Metadata,
    componentMappings: ComponentMappings,
    defaultRelatedComponent?: Component,
    defaultScalarComponent?: Component,
    defaultListComponent?: ListComponent,
    renderConfiguration?: OverrideConfig,
  }): JSX.Element {
  const data = props.data;
  const subComponents: JSX.Element[] = [];
  const defaultRelatedComponent = props.defaultRelatedComponent != null ?
    props.defaultRelatedComponent : DefaultObjectComponent;
  const defaultScalarComponent = props.defaultScalarComponent != null ?
    props.defaultScalarComponent : DefaultScalarComponent;
  const defaultListComponent = props.defaultListComponent != null ?
    props.defaultListComponent : DefaultListComponent;

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const dataItem: DataItem = data[key];
      const renderConfiguration = getRenderConfiguration(key, props.renderConfiguration);
      const renderFunction = renderFunctionOrDefault(
        dataItem.__typename,
        DefaultObjectComponent,
        {overrides: props.renderConfiguration, type: props.componentMappings},
      );

      const renderConfig = {tree: renderConfiguration, type: props.componentMappings};

      subComponents.push(renderFunction(
        {
          data: dataItem,
          metadata: props.metadata,
          defaultRelatedComponent,
          defaultScalarComponent,
          defaultListComponent,
          renderConfig,
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
  defaultRelatedComponent,
  defaultScalarComponent,
  defaultListComponent,
  renderConfig,
}: ComponentArguments): {[key: string]: JSX.Element} {
  const properties: {[key: string]: JSX.Element} = {};
  const metaDataType = getMetadata(data.__typename, metadata);

  if (metaDataType && metaDataType.fields != null) {
    for (const propKey in data) {
      if (propKey === "__typename") {
        continue;
      }
      const propRenderConf = getRenderConfiguration(propKey, renderConfig.overrides);
      const propRendering = {tree: propRenderConf, type: renderConfig.type};

      const fieldMetadataMatches = metaDataType.fields.filter((field) => field.name === propKey);
      if (fieldMetadataMatches.length > 0) {
        properties[propKey] = renderField({
          data: data[propKey],
          metadata,
          defaultRelatedComponent,
          defaultScalarComponent,
          defaultListComponent,
          renderConfig: propRendering,
        }, fieldMetadataMatches[0].type);
      } else {
        console.error("No field metadata found for: " + propKey);
      }
    }
  }

  return properties;
}

function getRenderConfiguration(fieldName: string, renderConfiguration?: OverrideConfig)
: OverrideConfig | undefined {
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
        props.defaultScalarComponent,
        props.renderConfig,
    )(props);
    case "OBJECT":
    case "UNION":
    case "INTERFACE":
      return renderFunctionOrDefault(
        props.data.__typename,
        props.defaultRelatedComponent,
        props.renderConfig,
    )(props);
    case "LIST":
      return listRenderFunctionOrDefault(
        props.data.__typename,
        props.defaultListComponent,
        props.renderConfig,
      )(props, unwrapped.ofType);
    default:
      assertNever(unwrapped);
      return <span className="should not appear"></span>;
  }
}

function renderFunctionOrDefault(
  type: string,
  defaultComponent: Component,
  rendering: RenderConfig,
): Component {
  if (rendering.overrides != null && isComponentRenderConfiguration(rendering.overrides)) {
    return rendering.overrides.renderer;
  }
  if (type in rendering.type) {
    return rendering.type[type].default;
  } else {
    return defaultComponent;
  }
}

function listRenderFunctionOrDefault(
  type: string,
  defaultComponent: ListComponent,
  rendering: RenderConfig,
): ListComponent {
  if (rendering.overrides != null && isListComponentRenderConfiguration(rendering.overrides)) {
    return rendering.overrides.listRenderer;
  }
  if (type in rendering.type) {
    return rendering.type[type].default;
  } else {
    return defaultComponent;
  }
}

function isListComponentRenderConfiguration(renderConfiguration?: OverrideConfig):
  renderConfiguration is ListComponentOverrideConfiguration {
  // TODO: check if type of the renderer is Component
  return renderConfiguration != null &&
  renderConfiguration.hasOwnProperty("listRenderer");
}

function isComponentRenderConfiguration(renderConfiguration?: OverrideConfig):
  renderConfiguration is ComponentOverrideConfiguration {
  // TODO: check if type of the renderer is Component
  return renderConfiguration != null &&
  renderConfiguration.hasOwnProperty("renderer");
}

function isObjectRenderConfiguration(renderConfiguration?: OverrideConfig):
  renderConfiguration is ObjectOverrideConfiguration {

  return renderConfiguration != null &&
  !renderConfiguration.hasOwnProperty("renderer");
}
