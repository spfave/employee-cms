USE employee_DB;

INSERT INTO departments (department)
VALUES
("Administration"),
("Design"),
("Engineering"),
("Finance"),
("IT"),
("Legal"),
("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES
("Manager", 125000, 1),
("Assistant", 80000, 1),
("Lead Designer", 120000, 2),
("Designer", 100000, 2),
("Lead Engineer", 120000, 3),
("Engineer", 100000, 3),
("Accountant", 110000, 4),
("Network Admin", 115000, 5),
("Lawyer", 150000, 6),
("Market Analyst", 90000, 7);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("John", "Smith", 1, NULL),
("Tiffany", "Minor", 2, 1),
("Frank", "Lucas", 3, NULL),
("Dan", "Noland", 5, NULL),
("Gabe", "Balsara", 6, 4),
("DJ", "Jones", 6, 4),
("Ashley", "Carmen", 7, 2),
("Gary", "Shields", 8, NULL),
("Alex", "Colins", 10, NULL);
