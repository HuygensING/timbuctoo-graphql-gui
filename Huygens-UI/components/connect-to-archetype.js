import React from "react";
import SelectField from "./fields/select-field";

class ConnectToArchetype extends React.Component {
  render() {
    const { onMapCollectionArchetype, onConfirmCollectionArchetypeMappings,
      sheets, archetype, mappings, uploadedFileName} = this.props;

    const collectionsAreMapped = Object.keys(mappings.collections).length > 0 &&
      Object.keys(mappings.collections).map((key) => mappings.collections[key].archetypeName).indexOf(null) < 0;

    return (
      <div>


        <div className="container basic-margin">
          {sheets.map((sheet) => (
            <div className="row" key={sheet.collection}>
              <div className="col-md-2">
                <span className="from-excel">
                  <img src="images/icon-excel.svg" alt=""/> {sheet.collection}
                  </span>
              </div>
              <div className="col-md-8">
                <SelectField
                  onChange={(value) => onMapCollectionArchetype(sheet.collection, value)}
                  onClear={() => onMapCollectionArchetype(sheet.collection, null) }
                  value={mappings.collections[sheet.collection].archetypeName}>
                    <span type="placeholder">
                      Connect <em>{sheet.collection}</em> to a Timbuctoo archetype.
                    </span>
                    {Object.keys(archetype).filter((domain) => domain !== "relations").sort().map((option) => (
                      <span value={option}>{option}</span>
                    ))}
                </SelectField>
              </div>
              { mappings.collections[sheet.collection].archetypeName ? (
                  <div className="col-sm-1 hi-success">
                    <span className="glyphicon glyphicon-ok pull-right"/>
                  </div>
                ) : null
              }
            </div>
          ))}

        </div>

        <div className="container basic-margin">
          <button onClick={onConfirmCollectionArchetypeMappings} type="button" className="btn btn-success" disabled={!collectionsAreMapped}>
            Connect
          </button>
        </div>
      </div>
    )
  }
}

export default ConnectToArchetype;