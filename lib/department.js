const utilFuncs = require("./utilfuncs");

class Department {
  constructor() {}

  static get table() {
    return "departments";
  }

  static promptsAdd() {
    return [
      {
        type: "input",
        message: "Enter department name:",
        validate: utilFuncs.validateStringContent,
        filter: utilFuncs.capitalize,
        name: "department",
      },
    ];
  }

  static promptsRemove(departments) {
    return [
      {
        type: "list",
        message: "Select department to remove:",
        choices: departments,
        filter: utilFuncs.trimID,
        name: "id",
      },
    ];
  }
}

module.exports = Department;
