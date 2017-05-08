import * as React from "react";
import {DataRenderer, TimComponent} from "../components/api";
import {assertNever, FieldMetadataType, MetadataType, unwrapNonNull} from "./graphqlHelpers";

export class GraphQlRenderConfig {
  private defaults: DefaultMappings;
  private overrides?: OverrideConfig;
  private defaultObjectComponent: TimComponent;
  private defaultScalarComponent: TimComponent;
  private defaultListComponent: TimComponent;
  private unknownComponent: TimComponent;

  constructor(defaults: DefaultMappings, overrides?: OverrideConfig) {
    this.defaults = defaults;
    this.overrides = overrides;
    this.defaultObjectComponent = {
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
    this.defaultScalarComponent = {
      render(dataRenderer: DataRenderer) {
        return <span>{dataRenderer.getData()}<br/></span>;
      },
    };
    this.defaultListComponent = {
      render(dataRenderer: DataRenderer) {
        const props: JSX.Element[] = [];
        for (let i = 0; i < dataRenderer.count(); i++) {
          props.push(dataRenderer.renderField(i));
        }

        return <ul>{props.map((prop) => <li>{prop}</li>)}</ul>;
      },
    };
    this.unknownComponent = {
      render(dataRenderer: DataRenderer) {
        return <div></div>;
      },
    };
  }

  public getComponent(fieldMetadata: MetadataType): TimComponent {
    const kind = fieldMetadata.kind;
    switch (fieldMetadata.kind) {
      case "ENUM":
      case "SCALAR":
        return this.renderFunctionOrDefault(fieldMetadata.name, this.defaultScalarComponent);
      case "OBJECT":
      case "UNION":
      case "INTERFACE":
        return this.defaultObjectComponent;
      case "LIST":
        return this.defaultListComponent;
      default:
        console.error("Unhandle case for: ", fieldMetadata);
        return this.unknownComponent;
    }
  }

  public subRenderConfigFor(fieldName: string | number): GraphQlRenderConfig {
    if (isObjectOverrideConfiguration(this.overrides)) {
      return new GraphQlRenderConfig(this.defaults, this.overrides[fieldName] );
    }
    return new GraphQlRenderConfig(this.defaults);
  }

  private renderFunctionOrDefault(
      type: string,
      defaultComponent: TimComponent,
  ): TimComponent {
    if (this.overrides != null && isComponentRenderConfiguration(this.overrides)) {
      return this.overrides.renderer;
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
