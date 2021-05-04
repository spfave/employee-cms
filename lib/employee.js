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
        message: "Enter the employee's first name:",
        validate: utilFuncs.validateStringContent,
        filter: utilFuncs.capitalize,
        name: "firstName",
      },
      {
        type: "input",
        message: "Enter the employee's last name:",
        validate: utilFuncs.validateStringContent,
        filter: utilFuncs.capitalize,
        name: "lastName",
      },
      {
        type: "input",
        message: "Select the employee's role:",
        choices: employeeRoles,
        name: "roleID",
      },
      {
        type: "input",
        message: "Select the employee's manager:",
        choices: managers,
        name: "managerID",
      },
    ];
  }
}

module.exports = Employee;
