const utilFuncs = require("./utilfuncs");

/**
 * TableItem acts as a parent class for db table matching classes
 */
class TableItem {
  constructor() {}

  static promptsRemove(message, choices) {
    return [
      {
        type: "list",
        message: message,
        choices: choices,
        filter: utilFuncs.trimID,
        name: "id",
      },
    ];
  }
}

module.exports = TableItem;
