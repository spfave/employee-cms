// Modules
const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
const cTable = require("console.table");
require("dotenv").config();

const Department = require("./department");

// Variables
const dbConnection = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
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
        this.viewData("departments");
        break;

      case "View all employee roles":
        this.viewData("roles");
        break;

      case "View all employees":
        this.viewData("employees");
        break;

      case "Add new department":
        this.promptDBEntry(Department);
        break;

      default:
        console.log("Thanks for using Employee CMS, goodbye."); //Exit
        this.dbConnEnd();
        break;
    }
  }

  viewData(data) {
    let query = "";
    switch (data) {
      case "departments":
        query = "SELECT * FROM departments;";
        break;

      case "roles":
        query = `
        SELECT roles.id, title, salary, department
        FROM roles
        LEFT JOIN departments ON roles.department_id = departments.id;`;
        break;

      case "employees":
        query = `
          SELECT employeeTbl.id, employeeTbl.first_name, employeeTbl.last_name, title, department, lpad(salary,12," ") AS "salary", if(employeeTbl.manager_id IS NULL, "", concat(managerTBL.first_name, " ", managerTBL.last_name)) AS "Manager"
          FROM employees as employeeTbl
          LEFT JOIN roles ON employeeTbl.role_id = roles.id
          LEFT JOIN departments ON roles.department_id = departments.id
          LEFT JOIN employees as managerTBL ON employeeTbl.manager_id = managerTbl.id;`;
        break;

      default:
        break;
    }

    this.dbConn
      .query(query)
      .then(([rows]) => console.table(rows))
      .catch((error) => console.log(error))
      .then(() => this.menu());
  }

  addDBTableRow(table, rowData) {
    const query = `INSERT INTO ${table} SET ?`;
    this.dbConn
      .query(query, [rowData])
      .then(() => console.log(``))
      .catch((error) => console.log(error))
      .then(() => this.menu());
  }

  async promptDBEntry(item) {
    const itemInput = await inquirer.prompt(item.prompts);
    this.addDBTableRow(item.table, itemInput);
  }
}

//
module.exports = EmployeeCMS;
