const TableItem = require("./tableitem");
const utilFuncs = require("./utilfuncs");

class Employee extends TableItem {
  constructor() {}

  static table = "employees";

  static promptAdd(roles, managers) {
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

  // `Select employee to ${action}` // update, remove
  // `Select employee's new ${action}` // manager, role

  static promptRemove(employees) {
    return super.promptListWithID("Select employee to remove:", employees);
  }
}

module.exports = Employee;
