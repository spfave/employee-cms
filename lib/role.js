const utilFuncs = require("./utilfuncs");

class Role {
  constructor() {}

  static get table() {
    return "roles";
  }

  static promptsAdd(departments) {
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

  static promptsRemove(roles) {
    return [
      {
        type: "list",
        message: "Select role to remove:",
        choices: roles,
        filter: utilFuncs.trimID,
        name: "id",
      },
    ];
  }
}

module.exports = Role;
