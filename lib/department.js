const TableItem = require("./tableitem");
const utilFuncs = require("./utilfuncs");

class Department extends TableItem {
  constructor() {
    super();
  }

  static table = "departments";

  static promptAdd() {
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

  static promptRemove(departments) {
    return super.promptListWithID("Select department to remove:", departments);
  }
}

module.exports = Department;
