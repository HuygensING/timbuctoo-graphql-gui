import React from "react";
import ReactDOM from "react-dom";
import cx from "classnames";

class SelectField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
    this.documentClickListener = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.documentClickListener, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.documentClickListener, false);
  }

  toggleSelect() {
    if(this.state.isOpen) {
      this.setState({isOpen: false});
    } else {
      this.setState({isOpen: true});
    }
  }

  handleDocumentClick(ev) {
    const { isOpen } = this.state;
    if (isOpen && !ReactDOM.findDOMNode(this).contains(ev.target)) {
      this.setState({
        isOpen: false
      });
    }
  }

  render() {
    const { onChange, onClear, value, btnClass, noClear } = this.props;

    const selectedOption = React.Children.toArray(this.props.children).filter((opt) => opt.props.value === value);
    const placeholder = React.Children.toArray(this.props.children).filter((opt) => opt.props.type === "placeholder");
    const otherOptions = React.Children.toArray(this.props.children).filter((opt) => opt.props.value && opt.props.value !== value);

    return (

      <div className={cx("dropdown", {open: this.state.isOpen})}>
        <button className={cx("btn", "dropdown-toggle", btnClass || "btn-blank")} onClick={this.toggleSelect.bind(this)}>
          {selectedOption.length ? selectedOption : placeholder} <span className="caret" />
        </button>

        <ul className="dropdown-menu">
          { value && !noClear ? (
            <li>
              <a onClick={() => { onClear(); this.toggleSelect();}}>
                - clear -
              </a>
            </li>
          ) : null}
          {otherOptions.map((option, i) => (
            <li key={i}>
              <a style={{cursor: "pointer"}} onClick={() => { onChange(option.props.value); this.toggleSelect(); }}>{option}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

SelectField.propTypes = {
  onChange: React.PropTypes.func,
  onClear: React.PropTypes.func,
  value: React.PropTypes.any,
  btnClass: React.PropTypes.string,
  noClear: React.PropTypes.bool
};

export default SelectField;
