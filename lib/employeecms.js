// Modules
const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
const cTable = require("console.table");
require("dotenv").config();

const Department = require("./department");
const Role = require("./role");
const Employee = require("./employee");

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
    "Remove department",
    "Remove employee role",
    "Remove employee",
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
        this.promptDataEntry("department");
        break;

      case "Add new employee role":
        this.promptDataEntry("role");
        break;

      case "Add new employee":
        this.promptDataEntry("employee");
        break;

      // case "Update employee role":
      //   this.promptDataUpdate("employee");
      //   break;

      case "Remove department":
        this.promptDataRemoval("department");
        break;

      case "Remove employee role":
        this.promptDataRemoval("role");
        break;

      case "Remove employee":
        this.promptDataRemoval("employee");
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
        SELECT roles.id, title, lpad(salary,12," ") AS "salary", department
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
        console.log("Invalid selection");
        this.menu();
        return;
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
      .then(() => console.log(`Successfully added data to ${table} table`))
      .catch((error) => console.log(error))
      .then(() => this.menu());
  }

  removeDBTableRow(table, rowID) {
    const query = `DELETE FROM ${table} WHERE ?`;
    this.dbConn
      .query(query, [rowID])
      .then(() => console.log(`Successfully removed data from ${table} table`))
      .catch((error) => console.log(error))
      .then(() => this.menu());
  }

  async promptDataEntry(data) {
    let dataInput;
    switch (data) {
      case "department":
        dataInput = await inquirer.prompt(Department.promptsAdd());
        this.addDBTableRow("departments", dataInput);
        break;

      case "role":
        const departmentsWithID = await this.getDataWithID("departments");
        dataInput = await inquirer.prompt(Role.promptsAdd(departmentsWithID));
        this.addDBTableRow("roles", dataInput);
        break;

      case "employee":
        const rolesWithID = await this.getDataWithID("roles");
        const employeesWithID = await this.getDataWithID("employees");
        dataInput = await inquirer.prompt(
          Employee.promptsAdd(rolesWithID, employeesWithID)
        );
        this.addDBTableRow("employees", dataInput);
        break;

      default:
        console.log("Invalid selection");
        this.menu();
        return;
    }
  }

  async promptDataRemoval(data) {
    let dataInput;
    switch (data) {
      case "department":
        const departmentsWithID = await this.getDataWithID("departments");
        dataInput = await inquirer.prompt(
          Department.promptsRemove(departmentsWithID)
        );
        this.removeDBTableRow("departments", dataInput);
        break;

      case "role":
        const rolesWithID = await this.getDataWithID("roles");
        dataInput = await inquirer.prompt(Role.promptsRemove(rolesWithID));
        this.removeDBTableRow("roles", dataInput);
        break;

      case "employee":
        const employeesWithID = await this.getDataWithID("employees");
        dataInput = await inquirer.prompt(
          Employee.promptsRemove(employeesWithID)
        );
        this.removeDBTableRow("employees", dataInput);
        break;

      default:
        console.log("Invalid selection");
        this.menu();
        return;
    }
  }

  async getDataWithID(data) {
    let query = "";
    switch (data) {
      case "departments":
        query = `SELECT CONCAT(id, ": ", department) AS "dataWithID" FROM departments ORDER BY department;`;
        break;

      case "roles":
        query = `SELECT CONCAT(id, ": ", title) AS "dataWithID" FROM roles ORDER BY title;`;
        break;

      case "employees":
        query = `SELECT CONCAT(id, ": ", first_name, " ", last_name) AS "dataWithID" 
          FROM employees ORDER BY first_name;`;
        break;

      default:
        console.log("Invalid selection");
        this.menu();
        return;
    }

    const [rows] = await this.dbConn.query(query);
    return rows.map(({ dataWithID }) => dataWithID); // return list of concatenated id and data value
  }
}

//
module.exports = EmployeeCMS;
