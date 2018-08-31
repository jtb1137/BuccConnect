import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

// @TODO - Fix error rendering
const SelectFieldGroup = ({ name, value, label, error, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        error={error}
        className={classnames("form-control form-control-lg", {
          is_invalid: error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectFieldGroup;
