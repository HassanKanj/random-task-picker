/*-------------------------------------------------------*
Random Task Picker: 
https://github.com/HassanKanj/random-task-picker
*-------------------------------------------------------*/

const figlet = require("figlet");
const packageJson = require("./package.json");
const utils = require("./utils.js");
const inquirer = require("inquirer");
const trello = require("./trello");
const chalk = require("chalk");
const configStore = require("configstore");
const jsonQuery = require("json-query");

const config = new configStore(packageJson.name);

function showAppInfo() {
  console.clear();
  // extra space between 'Task' and 'Picker' is intentional
  console.log(figlet.textSync("Random Task  Picker"));
  console.log(
    " ",
    chalk.underline(
      `Random Task Picker version ${packageJson.version} (By Hassan Kanj)\n\n`
    )
  );
}

function showMain() {
  showAppInfo();
  let mainMenuOptions = [
    "Pick a random task for me",
    "What was the last picked task?",
    "Mark the last picked task as done",
    new inquirer.Separator(),
    "Show current configs",
    "Update current configs",
    "Exit",
  ];
  inquirer
    .prompt([
      {
        name: "main_item",
        type: "list",
        message: "Main Menu:",
        choices: mainMenuOptions,
      },
    ])
    .then((answer) => {
      switch (answer.main_item) {
        case "Pick a random task for me":
          pickRandomTask();
          break;

        case "What was the last picked task?":
          showLastPickedTask();
          break;

        case "Show current configs":
          showCurrentConfigs();
          break;

        case "Update current configs":
          updateConfigs();
          break;
        case "Mark the last picked task as done":
          markPickedTaskAsDone();
        case "Exit":
          process.exit();
      }
    });
}

async function pickRandomTask() {
  try {
    let tasksListId = config.get("board.tasks_list_id");
    let tasks = (await trello.getCards(tasksListId)).data;
    let index = Math.floor(Math.random() * tasks.length) % tasks.length;
    let name = tasks[index].name;
    let description = tasks[index].desc;
    let id = tasks[index].id;
    config.set("board.picked_card_id", id);
    config.set("board.picked_card_name", name);
    config.set("board.picked_card_description", description);
    utils.printTask(name, description);
    showBack();
  } catch (error) {
    console.log(error);
  }
}

function showLastPickedTask() {
  if (!config.has("board.picked_card_id")) {
    utils.printError(`Task not found! make sure to pick a random task first.`);
  } else {
    utils.printTask(
      config.get("board.picked_card_name"),
      config.get("board.picked_card_description")
    );
  }
  showBack();
}

function markPickedTaskAsDone() {
  if (!config.has("board.picked_card_id")) {
    utils.printError(`Task not found! make sure to pick a random task first.`);
  } else {
    utils.printTask(
      config.get("board.picked_card_name"),
      config.get("board.picked_card_description")
    );
    inquirer
      .prompt([
        {
          name: "mark_as_done",
          type: "confirm",
          message: `Mark the above task as done (this will move it to '${config.get(
            "board.done_list_name"
          )}')`,
        },
      ])
      .then(async (answer) => {
        try {
          if (answer.mark_as_done) {
            console.log("Marking task as done...");
            let pickedCardId = config.get("board.picked_card_id");
            let doneListId = config.get("board.done_list_id");
            await trello.moveCard(pickedCardId, doneListId);
            console.log("Task moved successfully.");
            showBack();
          } else {
            showBack();
          }
        } catch (error) {
          console.log(error);
        }
      });
  }
}

function showCurrentConfigs() {
  if (config.has("board")) {
    console.log(config.get("board"));
  }
  showBack();
}

function showBoardPicker() {
  return new Promise(async (resolve) => {
    try {
      let boards = (await trello.getAllBoards()).data;
      let boardsOptions = [];
      boards.forEach((board) => {
        boardsOptions.push(board.name);
      });

      inquirer
        .prompt([
          {
            name: "board_name",
            type: "list",
            message: "Select your default Trello board",
            choices: boardsOptions,
          },
        ])
        .then((answer) => {
          resolve(handleBoardPicker(answer, boards));
        });
    } catch (error) {
      console.log(error);
    }
  });
}

function showBack() {
  let backOptions = ["Press ENTER to go back"];
  inquirer
    .prompt([
      {
        name: "back_menu_item",
        type: "list",
        message: " ",
        choices: backOptions,
      },
    ])
    .then((answer) => {
      showMain();
    });
}

function updateConfigs() {
  config.clear();
  showBoardPicker().then((boardId) => {
    showListsPicker(boardId).then(() => {
      showMain();
    });
  });
}

function show() {
  if (!config.has("board")) {
    updateConfigs();
  } else {
    showMain();
  }
}

function showListsPicker(boardId) {
  return new Promise(async (resolve) => {
    try {
      lists = await trello.getBoardLists(boardId);
      let listsOptions = [];
      lists.data.forEach((list) => {
        listsOptions.push(list.name);
      });
      inquirer
        .prompt([
          {
            name: "tasks_list_name",
            type: "list",
            message:
              "Select your tasks list (a random task will be picked from this one)",
            choices: listsOptions,
          },
          {
            name: "done_list_name",
            type: "list",
            message:
              "Select your 'done' list (task will be moved here when marked as done)",
            choices: listsOptions,
          },
        ])
        .then((answer) => {
          resolve(handleListsPicker(answer, lists));
        });
    } catch (error) {
      console.log(error);
    }
  });
}

function handleListsPicker(answer, lists) {
  let tasksListId = jsonQuery(`data[name=${answer.tasks_list_name}].id`, {
    data: lists,
  }).value;
  let doneListId = jsonQuery(`data[name=${answer.done_list_name}].id`, {
    data: lists,
  }).value;
  config.set("board.tasks_list_name", answer.tasks_list_name);
  config.set("board.tasks_list_id", tasksListId);
  config.set("board.done_list_name", answer.done_list_name);
  config.set("board.done_list_id", doneListId);
}

function handleBoardPicker(answer, boards) {
  config.set("board.board_name", answer.board_name);
  let boardId = jsonQuery(`[name=${answer.board_name}].id`, {
    data: boards,
  }).value;
  config.set("board.board_id", boardId);
  return boardId;
}

module.exports = {
  showAppInfo,
  show,
};
