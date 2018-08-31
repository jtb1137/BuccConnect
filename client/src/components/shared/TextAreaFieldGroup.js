import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

// @TODO - Fix error rendering
const TextAreaGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  onChange
}) => {
  return (
    <div className="form-group">
      <textarea
        error={error}
        className={classnames("form-control form-control-lg", {
          is_invalid: error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaGroup;
