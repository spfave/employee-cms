// Modules
const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
const cTable = require("console.table");

// Variables
const dbConnection = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_DB",
};

const promptMenu = {
  type: "rawlist",
  message: "What would you like to do",
  choices: [
    "View all departments",
    "View all employee roles",
    "View all employees",
    //bonus "View all employees by department",
    //bonus "View all employees by manager",
    "Add new department",
    "Add new employee role",
    "Add new employee",
    "Update employee role",
    //bonus "Update employee manager",
    //bonus "Remove employee",
    "Exit",
  ],
  name: "action",
};

/**
 * EmployeeCMS is responsible for all functionality associated with the employee
 * content management system console application
 */
class EmployeeCMS {
  constructor() {
    this.dbConn;
  }

  start() {
    this.dbConnStart()
      .then(() => {
        console.log(
          `connected to ${dbConnection.database} as id ${this.dbConn.threadId}\n`
        );

        this.menu();
      })
      .catch((error) => console.log(error));
  }

  async dbConnStart() {
    this.dbConn = await mysql.createConnection(dbConnection);
  }

  async dbConnEnd() {
    this.dbConn.end();
  }

  async menu() {
    const selection = await inquirer.prompt(promptMenu);
    switch (selection.action) {
      case "View all departments":
        // console.log(selection.action);
        this.viewDBTable("departments");
        break;

      default:
        console.log("Thanks for using Employee CMS, bye."); //Exit
        this.dbConnEnd();
        break;
    }
  }

  viewDBTable(table) {
    const query = `SELECT * FROM ${table}`;
    this.dbConn
      // .execute("SELECT * FROM ?",[table])
      .execute(query)
      .then(([rows]) => console.table(rows))
      .catch((error) => console.log(error));
  }
}

//
module.exports = EmployeeCMS;
