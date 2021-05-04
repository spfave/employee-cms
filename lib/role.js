const utilFuncs = require("./utilfuncs");

class Role {
  constructor() {}

  static get table() {
    return "roles";
  }

  static get prompts(departments) {
    return [
      {
        type: "input",
        message: "Enter employee role name:",
        validate: utilFuncs.validateStringContent,
        filter: utilFuncs.capitalize,
        name: "role",
      },
      {
        type: "input",
        message: "Enter the employee role salary:",
        validate: utilFuncs.validateSalary,
        filter: utilFuncs.stringTrim,
        name: "salary",
      },
      {
        type: "input",
        message: "Select the employee role department:",
        choices: departments,
        name: "departmentID",
      },
    ];
  }
}

module.exports = Role;
