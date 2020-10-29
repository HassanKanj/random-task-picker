/*-------------------------------------------------------*
Random Task Picker: 
https://github.com/HassanKanj/random-task-picker
*-------------------------------------------------------*/

require("dotenv").config();
const axios = require("axios");

function request(method, route, query) {
  return new Promise((resolve, reject) => {
    let fullUrl = process.env.TRELLO_API_BASE_URI + `/${route}`;
    if (!query) {
      query = {};
    }
    query.token = process.env.TRELLO_USER_TOKEN;
    query.key = process.env.TRELLO_APP_KEY;
    axios({
      method: method,
      url: fullUrl,
      data: query,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getAllBoards() {
  return request("GET", "members/me/boards");
}

function getBoardLists(boardId) {
  return request("GET", `boards/${boardId}/lists`);
}

function getCards(listId) {
  return request("GET", `list/${listId}/cards`);
}

function moveCard(cardId, listId) {
  return request("PUT", `cards/${cardId}`, { idList: listId });
}

module.exports = {
  request,
  getAllBoards,
  getBoardLists,
  getCards,
  moveCard,
};
