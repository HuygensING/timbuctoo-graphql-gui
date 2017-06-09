import React from "react";

class TextSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  }

  handleInputChange(ev) {
    this.setState({
      value: ev.target.value
    });
  }

  handleInputKeyDown(ev) {
    if (ev.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    this.props.onChange(this.props.field, this.state.value);
  }

  render() {
    const { label } = this.props;

    return (
      <div className="facet">
        <div className="input-group">
          <input className="form-control"
                 placeholder={label || ""}
                 onChange={this.handleInputChange.bind(this)}
                 onKeyDown={this.handleInputKeyDown.bind(this)}
                 value={this.state.value || ""} />

          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this.handleSubmit.bind(this)}>
              <span className="glyphicon glyphicon-search" />
            </button>
          </span>
        </div>
      </div>
    );
  }
}

TextSearch.defaultProps = {
  field: null
};

TextSearch.propTypes = {
  field: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func
};

export default TextSearch;