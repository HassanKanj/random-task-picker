require("dotenv").config();
const menu = require("./menu");
const utils = require("./utils");

menu.showAppInfo();

if (!process.env.TRELLO_APP_KEY) {
  utils.printError(`Error: TRELLO_APP_KEY is not set in the .env file.`);
  process.exit();
}

if (!process.env.TRELLO_USER_TOKEN) {
  utils.printError(`Error: TRELLO_USER_TOKEN is not set in the .env file.`);
  process.exit();
}

menu.show();
