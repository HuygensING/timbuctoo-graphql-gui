import React from "react";
import cx from "classnames";

class HeaderCell extends React.Component {

  render() {
    const { header, isConfirmed, isIgnored, onIgnoreColumnToggle } = this.props;

    return (
      <th className={cx({
        success: isConfirmed,
        info: !isConfirmed && !isIgnored,
        danger: !isConfirmed && isIgnored
      })}>
        {header}
        <a style={{cursor: "pointer"}} className={cx("pull-right", "glyphicon", {
          "glyphicon-ok-sign": isConfirmed,
          "glyphicon-question-sign": !isConfirmed && !isIgnored,
          "glyphicon-remove": !isConfirmed && isIgnored
        })} onClick={() => !isConfirmed ? onIgnoreColumnToggle(header) : null } >
        </a>
      </th>
    );
  }
}

HeaderCell.propTypes = {
  header: React.PropTypes.string,
  isConfirmed: React.PropTypes.bool,
  isIgnored: React.PropTypes.bool,
  onIgnoreColumnToggle: React.PropTypes.func
};

export default HeaderCell;