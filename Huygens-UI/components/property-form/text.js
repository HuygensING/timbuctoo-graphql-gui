import React from "react";
import ColumnSelect from "./column-select";


class Form extends React.Component {


  render() {
    return <ColumnSelect {...this.props} />
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
