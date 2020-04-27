// NPM Packages
var mysql = require("mysql");
var inquire = require("inquirer");
var Table = require("cli-table2");

// Var for adding the connectino to MySQL
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Playstation1!",
  database: "bamazon",
});

// Test the connection
connection.connect(function (err) {
  if (err) throw err;
  display();
});

// Var function that displays the product list
var display = function () {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    // Opening Message
    console.log("----------------------------");
    console.log("     Welcome to Bamzon      ");
    console.log("----------------------------");
    console.log("");
    console.log("Find Your Product Below");
    console.log("");

    // Var function to format the product table
    var table = new Table({
      head: ["item_id", "product_name", "price"],
      colWidths: [9, 25, 9],
      colAligns: ["center", "center", "right"],
      style: {
        head: ["aqua"],
        compact: true,
      },
    });
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].price]);
    }

    // Displays the product table
    console.log("");
    console.log(table.toString());
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
  });
  shop();
};

// Var function to purchase from the product list
var shop = function () {
  // Prompt to select item
  inquire
    .prompt({
      name: "productToBuy",
      type: "input",
      message: "Enter a item_id of the item you wish to buy!",
    })
    .then(function (answerFirst) {

      // Var for item_id
      var select = answerFirst.productToBuy;

      // Connection to MySQL var
      connection.query(
        "SELECT * FROM products WHERE item_id=?",
        select,
        function (err, res) {
          if (err) throw err;

          // If product doesn't exist
          if (res.length === 0) {
            console.log(
              "That product doesn't exist, enter a item_id from the list above"
            );
            shop();
          } else {

            // Prompt to select the quantity
            inquire
              .prompt({
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?",
              })
              .then(function (answerSec) {

                // Var for quantity
                var quantity = answerSec.quantity;

                // If trying to purchase more then the quantity in stock
                if (quantity > res[0].stock_quantity) {
                  console.log(
                    "Our Apologies! Insufficient quantity. We only have " +
                      res[0].stock_quantity +
                      "items of the product."
                  );
                  shop();
                } else {

                  // Display the item, quantity and totel of purchase
                  var endTotal = quantity * res[0].price;
                  console.log("");
                  console.log(res[0].product_name + " purchased");
                  console.log(quantity + " qty @ $" + res[0].price);
                  console.log("Total: $" + endTotal);
                  console.log("");

                  // Updates the quantity in MySQL
                  var newQuantity = res[0].stock_quantity - quantity;
                  connection.query(
                    "UPDATE products SET stock_quantity = " +
                      newQuantity +
                      " WHERE item_id = " +
                      res[0].item_id,
                    function (err, resUpdate) {
                      if (err) throw err;
                      console.log("");
                      console.log("Your order has been processed!");
                      console.log("****Thank you for shopping with us!****");
                      console.log("");
                      connection.end();
                    }
                  );
                }
              });
          }
        }
      );
    });
};
