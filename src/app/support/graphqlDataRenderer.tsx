import * as React from "react";
import { DataRenderer, TimComponent } from "../components/api";
import { convertToMetadataType, getMetadata, isListMetadata, Metadata } from "./graphqlHelpers";
import { GraphQlRenderConfig } from "./graphqlRenderConfig";

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
    const metadata = getMetadata(this.data.__typename, this.metadata);
    if (metadata && metadata.fields) {
      return metadata.fields.map(field => field.name).filter(field => this.data.hasOwnProperty(field));
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
      return new GraphQlDataRenderer(this.data[field], this.renderConfig.subRenderConfigFor(field), this.metadata);
    }
    return new GraphQlDataRenderer({}, this.renderConfig, this.metadata);
  }

  public renderField(field: string | number): JSX.Element {
    if (this.data.hasOwnProperty(field)) {
      if (this.data instanceof Array && typeof field === "number") {
        const fieldMetadata = getMetadata(this.data[field].__typename, this.metadata);
        if (fieldMetadata != null) {
          return this.renderConfig.getComponent(field, fieldMetadata).render(this.subRenderer(field));
        }
      } else if (this.data instanceof Object) {
        const metadataType = getMetadata(this.data.__typename, this.metadata);
        if (metadataType != null && metadataType.fields != null) {
          const fieldMetadataMatches = metadataType.fields.filter(mdField => mdField.name === field);
          if (fieldMetadataMatches.length > 0) {
            const fieldMetadata = convertToMetadataType(fieldMetadataMatches[0].type, this.metadata);
            if (fieldMetadata != null) {
              return this.renderConfig.getComponent(field, fieldMetadata).render(this.subRenderer(field));
            }
          } else {
            console.error("No field metadata found for: " + field);
          }
        }
      }
    }

    return <div />;
  }

  public getData() {
    return this.data;
  }
}
