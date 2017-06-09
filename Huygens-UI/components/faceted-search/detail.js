import React from "react";
import Page from "../page.jsx";
import camel2label from "./camel2label";

const ts2date = (ts) => {
  const date = new Date(ts);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

class Detail extends React.Component {

  render() {
    const { entity, collectionMetadata } = this.props;

    const birthDeathBlock = collectionMetadata.archetypeName === "person" ? (
      <div className="row small-marigin text-center">
        <div className="col-xs-3 text-right" />
        <div className="col-xs-6">
          <div className="row">
            <div className="col-xs-5 text-right">
              {entity["birthDate"]}<br />
              {entity["@relations"].hasBirthPlace ? entity["@relations"].hasBirthPlace[0].displayName : null }
            </div>
            <div className="col-xs-2 text-center">
              <img id="born-died" src="images/lived-center.svg" />
            </div>
            <div className="col-xs-5 text-left">
              {entity["deathDate"]}<br />
              {entity["@relations"].hasDeathPlace ? entity["@relations"].hasDeathPlace[0].displayName : null }
            </div>
          </div>
        </div>
      </div>
    ) : null;
    return (
      <Page>
        <div className="container basic-margin">
          <div className="row">
            <div className="col-xs-12 text-center">
              <span className="img-portrait img-circle" style={{
                  display: "inline-block", width: "150px", backgroundColor: "#aaa",
                  paddingTop: "40px", fontSize: "3em", color: "#666"
                }}>
                  {entity["@displayName"].charAt(0)}
              </span>
              <h1>{entity["@displayName"]}</h1>
            </div>
          </div>
          {birthDeathBlock}
        </div>
        <div className="container basic-margin">
          {collectionMetadata.properties
            .filter((property) => entity[property.name] || entity["@relations"][property.name])
            .map((property) => (
              <div key={property.name} className="row small-margin">
                <div className="col-xs-6 text-right hi-light-grey">
                  {camel2label(property.name)}
                </div>
                <div className="col-xs-6">
                  {entity[property.name] || entity["@relations"][property.name].map((rel) => rel.displayName).join(", ")}
                </div>
              </div>
          ))}
        </div>
        <div className="hi-light-grey-bg">
          <div className="container big-margin">
            <div className="row small-margin">
              <div className="col-xs-12 text-center">
                <h4>Provenance</h4>
              </div>
              <div className="row small-margin">
                <div className="col-xs-6 text-right hi-light-grey">
                  Modified {ts2date(entity["^modified"].timeStamp)}
                </div>
                <div class="col-xs-6">
                  {entity["^modified"].username || entity["^modified"].userId}
                </div>
              </div>
              <div className="row small-margin">
                <div className="col-xs-6 text-right hi-light-grey">
                  Created {ts2date(entity["^created"].timeStamp)}
                </div>
                <div class="col-xs-6">
                  {entity["^created"].username || entity["^created"].userId}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div type="footer-body">
          <div className="col-sm-4 text-right">
            <button type="button" className="btn btn-default">
              <span className="glyphicon glyphicon-chevron-left" />
            </button>
          </div>
          <div className="col-sm-4 text-center">
            <button type="button" className="btn btn-default">Back to results</button>
          </div>
          <div className="col-sm-4 text-left">
            <button type="button" className="btn btn-default">
              <span className="glyphicon glyphicon-chevron-right" />
            </button>
          </div>
        </div>
      </Page>
    )
  }
}

export default Detail;
