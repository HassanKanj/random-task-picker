/*-------------------------------------------------------*
Random Task Picker: 
https://github.com/HassanKanj/random-task-picker
*-------------------------------------------------------*/

const chalk = require("chalk");
const wrapText = require("wrap-text");

function printError(message) {
  console.log(chalk.bgRed.white(message));
}

function printLine() {
  console.log("_".repeat(50));
}

function printTask(name, description) {
  printLine();
  let wrapValue = 50;
  let formattedName = wrapText(name, wrapValue);
  formattedName = ` ${formattedName} `;
  console.log(`\n${chalk.bgGreen.black(formattedName)}\n`);
  if (description != "" && description !== undefined) {
    formattedDescription = wrapText(description, wrapValue);
    console.log(`${chalk.italic(formattedDescription)}\n`);
  }
  printLine();
}

module.exports = {
  printError,
  printTask,
  printLine,
};
