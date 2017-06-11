import * as React from "react";
import { DataRenderer } from "./api";

export const personObject = {
  dataType: "OBJECT",
  render(dataRenderer: DataRenderer): JSX.Element {
    const properties: { [key: string]: any } = {};
    dataRenderer.fields().forEach(field => (properties[field] = dataRenderer.renderField(field)));
    const birthDeathBlock = (
      <div className="row small-margin text-center">
        <div className="col-xs-3 text-right" />
        <div className="col-xs-6">
          <div className="row">
            <div className="col-xs-5 text-right">
              {dataRenderer.renderField("birthDate")}
              {dataRenderer.renderField("birthPlace")}
            </div>
            <div className="col-xs-2 text-center">
              <img id="born-died" src="/build/images/lived-center.svg" />
            </div>
            <div className="col-xs-5 text-left">
              {dataRenderer.renderField("deathDate")}
              {dataRenderer.renderField("deathPlace")}
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="container basic-margin">
        <div className="row">
          <div className="col-xs-10 text-center">
            {dataRenderer.renderField("image")}
            <h1>{dataRenderer.renderField("name")}</h1>
            {birthDeathBlock}
          </div>
          <div className="container basic-margin">
            {Object.keys(properties)
              .sort()
              .filter(
                key =>
                  key !== "name" &&
                  key !== "image" &&
                  key !== "birthDate" &&
                  key !== "birthPlace" &&
                  key !== "deathDate" &&
                  key !== "deathPlace",
              )
              .map(key =>
                <div key={key} className="row small-margin">
                  <div className="col-xs-5 text-right hi-light-grey" style={{ fontWeight: "bold" }}>
                    {key}
                  </div>
                  <div className="col-xs-5">{properties[key]}</div>
                </div>,
              )}
          </div>
        </div>
      </div>
    );
  },
};
