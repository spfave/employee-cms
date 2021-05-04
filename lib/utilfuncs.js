// Inquirer Validation Functions
function validateStringContent(input) {
  if (input.trim() === "") return console.log("\nEntry can not be blank");
  return true;
}

function validateSalary(salary) {
  if (!salary.trim()) return console.log("Salary can not be left blank");
  if (!/^\$?[0-9]+\.?[0-9]?[0-9]?$/.test(salary))
    return console.log(
      "Invalid salary format, enter in format 'dollars.cents'"
    );
  return true;
}

// Inquirer Filter Functions
function stringTrim(string) {
  return string.trim();
}

function capitalize(string) {
  let str = stringTrim(string);
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

module.exports = {
  validateStringContent,
  validateSalary,
  stringTrim,
  capitalize,
};
