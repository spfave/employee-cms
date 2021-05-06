const utilFuncs = require("./utilfuncs");

class Role {
  constructor() {}

  static get table() {
    return "roles";
  }

  static prompts(departments) {
    return [
      {
        type: "input",
        message: "Enter role title:",
        validate: utilFuncs.validateStringContent,
        filter: utilFuncs.capitalize,
        name: "title",
      },
      {
        type: "input",
        message: "Enter role salary:",
        validate: utilFuncs.validateSalary,
        filter: utilFuncs.stringTrim,
        name: "salary",
      },
      {
        type: "list",
        message: "Select role department:",
        choices: departments,
        filter: utilFuncs.trimID,
        name: "department_id",
      },
    ];
  }
}

module.exports = Role;
