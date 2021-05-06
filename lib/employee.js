const TableItem = require("./tableitem");
const utilFuncs = require("./utilfuncs");

class Employee extends TableItem {
  constructor() {}

  static get table() {
    return "employees";
  }

  static promptsAdd(roles, managers) {
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
        type: "list",
        message: "Select employee's title:",
        choices: roles,
        filter: utilFuncs.trimID,
        name: "role_id",
      },
      {
        type: "list",
        message: "Select employee's manager:",
        choices: managers,
        filter: utilFuncs.trimID,
        name: "manager_id",
      },
    ];
  }

  static promptsRemove(employees) {
    return super.promptsRemove("Select employee to remove:", employees);
  }
}

module.exports = Employee;
