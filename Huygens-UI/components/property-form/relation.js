import React from "react";
import ColumnSelect from "./column-select";
import SelectField from "../fields/select-field";


class Form extends React.Component {


  render() {
    const { onColumnSelect, onClearColumn, propertyMapping, availableCollectionColumnsPerArchetype, archetypeFields } = this.props;

    const relationInfo = propertyMapping && propertyMapping.variable[0]
      ? propertyMapping.variable[0]
      : {};

    const targetArchetypeCollection = archetypeFields.find((af) => af.name === this.props.name).relation.targetCollection;
    const targetCollectionColumns = availableCollectionColumnsPerArchetype[targetArchetypeCollection];
    const targetCollections = targetCollectionColumns.map((t) => t.collectionName);

    const sourceColumnProps = {
      ...this.props,
      placeholder: "Select a source column...",
      onColumnSelect: (value) => onColumnSelect([{...relationInfo, variableName: value[0].variableName}])
    };

    console.log(targetCollectionColumns);

    const targetColumnProps = relationInfo.targetCollection ? {
      ...this.props,
      placeholder: "Select a target column...",
      propertyMapping: {variable: [{variableName: relationInfo.targetVariableName }]},
      columns: targetCollectionColumns.find((t) => t.collectionName === relationInfo.targetCollection).columns
        .map((col) => ({name: col})),
      onColumnSelect: (value) => onColumnSelect([{...relationInfo, targetVariableName: value[0].variableName}])
    } : null;




    return (
      <div>
        <ColumnSelect {...sourceColumnProps} />
        <SelectField value={relationInfo.targetCollection || null}
                     onChange={(value) => onColumnSelect([{...relationInfo, targetCollection: value}])}
                     onClear={() => onClearColumn(0)}>

          <span type="placeholder" className="from-excel"><img src="images/icon-excel.svg" alt=""/> Select a target sheet...</span>
          {targetCollections.map((collection) => (
            <span key={collection} value={collection} className="from-excel"><img src="images/icon-excel.svg" alt=""/> {collection}</span>
          ))}
        </SelectField>
        {targetColumnProps
          ? <ColumnSelect {...targetColumnProps} />
          : null
        }
      </div>
    )
  }
}

Form.propTypes = {
  collectionData: React.PropTypes.object,
  mappings: React.PropTypes.object,
  name: React.PropTypes.string,
  onClearFieldMapping: React.PropTypes.func,
  onSetFieldMapping: React.PropTypes.func
};

export default Form;
