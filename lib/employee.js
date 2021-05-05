const utilFuncs = require("./utilfuncs");

class Employee {
  constructor() {}

  static get table() {
    return "employees";
  }

  static get prompts(employeeRoles, managers) {
    return [
      {
        type: "input",
        message: "Enter employee's first name:",
        validate: utilFuncs.validateStringContent,
        filter: utilFuncs.capitalize,
        name: "first_name",
      },
      {
        type: "input",
        message: "Enter employee's last name:",
        validate: utilFuncs.validateStringContent,
        filter: utilFuncs.capitalize,
        name: "last_name",
      },
      {
        type: "input",
        message: "Select employee's title:",
        choices: employeeRoles,
        name: "role_id",
      },
      {
        type: "input",
        message: "Select employee's manager:",
        choices: managers,
        name: "manager_id",
      },
    ];
  }
}

module.exports = Employee;
