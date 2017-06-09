import React from "react";
import HeaderCell from "./table/header-cell";
import DataRow from "./table/data-row";

class CollectionTable extends React.Component {
  render() {
    const { onIgnoreColumnToggle } = this.props;
    const { rows, headers, nextUrl } = this.props;

    return (
      <div className="table-responsive">
        <table className="table table-bordered table-obtrusive">
          <thead>
            <tr>
              {headers.map((header) => (
                <HeaderCell key={header.name} header={header.name} onIgnoreColumnToggle={onIgnoreColumnToggle}
                            isIgnored={header.isIgnored} isConfirmed={header.isConfirmed} />
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => <DataRow key={i} row={row} />)}
          </tbody>
        </table>
        <button onClick={() => this.props.onLoadMoreClick && this.props.onLoadMoreClick(nextUrl)}
                disabled={!nextUrl}
                className="btn btn-default pull-right">more...</button>
      </div>
    );
  }
}

export default CollectionTable;