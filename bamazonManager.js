var mysql = require("mysql");
var inquire = require("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Playstation1!",
  database: "bamazon",
});

connection.connect(function (err) {
  if (err) throw err;
  managerApp();
});

var managerApp = function () {
  //   connection.query("SELECT * FROM products", function (err, res) {
  //     if (err) throw err;
  console.log("");
  console.log("----------------------------");
  console.log("Welcome to Bamzon's Manager App");
  console.log("----------------------------");
  console.log("");
  console.log("");

  inquire
    .prompt({
      name: "menu",
      type: "list",
      message: "Select an opition!",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ]
    })
    .then(function (firstAnswer) {
      switch (firstAnswer.action) {
        case "View Products for Sale":
          viewProducts();
          break;
        case "View Low Inventory":
          checkInventory();
          break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Product":
          newProductAdd();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
};
