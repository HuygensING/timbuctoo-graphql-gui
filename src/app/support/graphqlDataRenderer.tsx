import * as React from "react";
import {DataRenderer, TimComponent} from "../components/api";
import {getMetadata, Metadata} from "./graphqlHelpers";
import {GraphQlRenderConfig} from "./graphqlRenderConfig";

export class GraphQlDataRenderer implements DataRenderer {
  private data: any;
  private renderConfig: GraphQlRenderConfig;
  private metadata: Metadata;

  constructor(data: any, renderConfig: GraphQlRenderConfig, metadata: Metadata) {
    this.data = data;
    this.renderConfig = renderConfig;
    this.metadata = metadata;
  }

  public fields(): string[] {
    if (this.data instanceof Object) {
      return Object.keys(this.data).filter((field) => field !== "__typename");
    }
    return [];
  }

  public count(): number {
    if (this.data instanceof Array) {
      return this.data.length;
    }
    return 0;
  }

  public subRenderer(field: string | number): DataRenderer {
    if (this.data[field] != null) {
      return new GraphQlDataRenderer(
        this.data[field],
        this.renderConfig.subRenderConfigFor(field),
        this.metadata,
      );
    }
    return new GraphQlDataRenderer({}, this.renderConfig, this.metadata);
  }

  public renderField(field: string | number): JSX.Element {
    if (this.data.hasOwnProperty(field)) {
      if(this.data instanceof Object) {
        const metaDataType = getMetadata(this.data.__typename, this.metadata);
        if (metaDataType != null && metaDataType.fields != null) {
          const fieldMetadataMatches = metaDataType.fields.filter((mdField) => mdField.name === field);
          if (fieldMetadataMatches.length > 0) {
            return this.renderConfig.getComponent(fieldMetadataMatches[0].type)
              .render(this.subRenderer(field));
          } else {
            console.error("No field metadata found for: " + field);
          }
        }
      }
    }

    return <div></div>;
  }

  public getData() {
    return this.data;
  }

}
