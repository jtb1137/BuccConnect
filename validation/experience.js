const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.startdate = !isEmpty(data.startdate) ? data.startdate : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required.";
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = "Company field is required.";
  }
  if (Validator.isEmpty(data.startdate)) {
    errors.startdate = "Start date field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
