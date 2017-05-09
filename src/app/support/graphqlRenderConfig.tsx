import * as React from "react";
import {DataRenderer, TimComponent} from "../components/api";
import {assertNever, FieldMetadataType, MetadataType, unwrapNonNull} from "./graphqlHelpers";

const DefaultObjectComponent = {
  render(dataRenderer: DataRenderer) {
    const properties: {[key: string]: JSX.Element} = {};

    dataRenderer.fields().forEach((field) => {
      properties[field] = dataRenderer.renderField(field);
    });

    return (<div>
        {Object.keys(properties).sort().map((key) => <span>{key}: {properties[key]}</span>)}
    </div>);
  },
};

const DefaultScalarComponent = {
  render(dataRenderer: DataRenderer) {
    return <span>{dataRenderer.getData()}<br/></span>;
  },
};

const DefaultListComponent = {
  render(dataRenderer: DataRenderer) {
    const props: JSX.Element[] = [];
    for (let i = 0; i < dataRenderer.count(); i++) {
      props.push(dataRenderer.renderField(i));
    }

    return <ul>{props.map((prop) => <li>{prop}</li>)}</ul>;
  },
};

interface GraphQlRenderConfigParams {
  defaults: DefaultMappings;
  overrides?: OverrideConfig;
  defaultObject?: TimComponent;
  defaultScalar?: TimComponent;
  defaultList?: TimComponent;
}

export class GraphQlRenderConfig {
  private defaults: DefaultMappings;
  private overrides?: OverrideConfig;
  private defaultObjectComponent: TimComponent;
  private defaultScalarComponent: TimComponent;
  private defaultListComponent: TimComponent;
  private unknownComponent: TimComponent;

  constructor({defaults, overrides, defaultObject, defaultScalar, defaultList}: GraphQlRenderConfigParams) {
    this.defaults = defaults;
    this.overrides = overrides;
    this.defaultObjectComponent = defaultObject != null ? defaultObject : DefaultObjectComponent;
    this.defaultScalarComponent =  defaultScalar != null ? defaultScalar : DefaultScalarComponent;
    this.defaultListComponent = defaultList != null ? defaultList : DefaultListComponent;
    this.unknownComponent = {
      render(dataRenderer: DataRenderer) {
        return <div></div>;
      },
    };
  }

  public getComponent(field: string | number, fieldMetadata: MetadataType): TimComponent {
    const kind = fieldMetadata.kind;
    switch (fieldMetadata.kind) {
      case "ENUM":
      case "SCALAR":
        return this.renderFunctionOrDefault(field, fieldMetadata.name, this.defaultScalarComponent);
      case "OBJECT":
      case "UNION":
      case "INTERFACE":
        return this.renderFunctionOrDefault(field, fieldMetadata.name, this.defaultObjectComponent);
      case "LIST":
        return this.renderFunctionOrDefault(field, "", this.defaultListComponent);
      default:
        console.error("Unhandle case for: ", fieldMetadata);
        return this.unknownComponent;
    }
  }

  public subRenderConfigFor(field: string | number): GraphQlRenderConfig {
    const fieldOverrides = isObjectOverrideConfiguration(this.overrides) ? this.overrides[field] : undefined;

    return new GraphQlRenderConfig({
      defaults: this.defaults,
      overrides: fieldOverrides,
      defaultObject: this.defaultObjectComponent,
      defaultScalar: this.defaultScalarComponent,
      defaultList: this.defaultListComponent,
    });
  }

  private renderFunctionOrDefault(field: string | number, type: string, defaultComponent: TimComponent): TimComponent {
    if (this.overrides != null) {
      if (isObjectOverrideConfiguration(this.overrides) && this.overrides.hasOwnProperty(field.toString())) {
        const fieldOverride = this.overrides[field.toString()];
        if (isComponentRenderConfiguration(fieldOverride)) {
          return fieldOverride.renderer;
        }
      }
    }

    if (this.defaults.hasOwnProperty(type)) {
      return this.defaults[type];
    } else {
      return defaultComponent;
    }
  }
}

interface ComponentOverrideConfiguration {
  renderer: TimComponent;
}

interface ObjectOverrideConfiguration {
  [key: string]: OverrideConfig;
}

export type OverrideConfig =
  ComponentOverrideConfiguration |
  ObjectOverrideConfiguration;

export interface DefaultMappings {
  [key: string]: TimComponent;
}

function isObjectOverrideConfiguration(renderConfiguration?: OverrideConfig):
  renderConfiguration is ObjectOverrideConfiguration {

  return renderConfiguration != null &&
  !renderConfiguration.hasOwnProperty("renderer"); // TODO make a better check
}

function isComponentRenderConfiguration(renderConfiguration?: OverrideConfig):
  renderConfiguration is ComponentOverrideConfiguration {
  // TODO: check if type of the renderer is Component
  return renderConfiguration != null &&
  renderConfiguration.hasOwnProperty("renderer");
}
