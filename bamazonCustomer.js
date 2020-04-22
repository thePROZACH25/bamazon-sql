var mysql = require("mysql");
var inquire = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Playstation1!",
  database: "bamazon",
});

connection.connect(function (err) {
  if (err) throw err;
  startSear();
});

function startSear() {
  inquire
    .prompt({
      name: "menu",
      type: "list",
      message: "Welcome to Bamazon!",
      choices: ["Search Product", "Exit"],
    })
    .then(function (answer) {
      switch (answer.menu) {
        case "Search Product":
          productSear();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function productSear() {}
