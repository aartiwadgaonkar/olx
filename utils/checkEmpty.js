const validator = require("validator");
exports.checkEmpty = (feilds) => {
  const error = {};
  let isError=false
  for (const key in feilds) {
    if (validator.isEmpty(feilds[key] ? "" + feilds[key] : "")) {
      error[key] = `${key} is required`;
      isError=true
    }
  }
  return {isError,error};
};
