const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.startdate = !isEmpty(data.startdate) ? data.startdate : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "School is required.";
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required.";
  }
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of Study field is required.";
  }
  if (Validator.isEmpty(data.startdate)) {
    errors.startdate = "Start date field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
