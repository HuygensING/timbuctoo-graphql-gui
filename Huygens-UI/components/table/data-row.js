import React from "react";
import cx from "classnames";

class DataRow extends React.Component {

  render() {
    const { row } = this.props;
    return (
      <tr>
        {row.map((cell, i) => (
          <td className={cx({
            ignored: cell.ignored,
            danger: cell.error ? true : false
          })} key={i}>
            {cell.value}
            {cell.error ? <span className="pull-right glyphicon glyphicon-exclamation-sign" style={{cursor: "pointer"}} title={cell.error} /> : null}
          </td>
        ))}
      </tr>
    );
  }
}

DataRow.propTypes = {
  row: React.PropTypes.array,
};

export default DataRow;