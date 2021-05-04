const utilFuncs = require("./utilfuncs");

class Department {
  constructor() {}

  static get table() {
    return "departments";
  }

  static get prompts() {
    return [
      {
        type: "input",
        message: "Enter department name:",
        validate: utilFuncs.validateStringContent,
        filter: utilFuncs.capitalize,
        name: "name",
      },
    ];
  }
}

module.exports = Department;
