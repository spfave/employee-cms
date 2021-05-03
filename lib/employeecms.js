// Modules
const mysql = require("mysql2/promise");
const cTable = require("console.table");

// Variables
const dbConnection = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_DB",
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

        console.log("test");
        this.dbConnEnd();
      })
      .catch((error) => console.log(error));
  }

  async dbConnStart() {
    this.dbConn = await mysql.createConnection(dbConnection);
  }

  async dbConnEnd() {
    this.dbConn.end();
  }
}

//
module.exports = EmployeeCMS;
