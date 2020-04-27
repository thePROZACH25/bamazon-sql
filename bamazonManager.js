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
        "Exit",
      ],
    })
    .then(function (firstAnswer) {
      switch (firstAnswer.menu) {
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

var viewProducts = function () {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    var table = new Table({
      head: ["item_id", "product_name", "stock_quantity", "price"],
      colWidths: [9, 25, 9, 9],
      colAligns: ["center", "center", "center", "right"],
      style: {
        head: ["aqua"],
        compact: true,
      },
    });
    for (var i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].stock_quantity,
        res[i].price,
      ]);
    }
    console.log("");
    console.log(table.toString());
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
  });
  managerApp();
};

var checkInventory = function () {
  var query = "SELECT * FROM products WHERE stock_quantity < 5";
  connection.query(query, function (err, data) {
    if (err) throw err;

    var invenTable = new Table({
      head: ["item_id", "product_name", "stock_quantity"],
      colWidths: [9, 25, 9],
      colAligns: ["center", "center", "right"],
      style: {
        head: ["aqua"],
        compact: true,
      },
    });
    for (var i = 0; i < data.length; i++) {
      invenTable.push([
        data[i].item_id,
        data[i].product_name,
        data[i].stock_quantity,
      ]);
    }
    console.log("");
    console.log(invenTable.toString());
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
  });
  managerApp();
};

var addInventory = function () {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    var table = new Table({
      head: ["item_id", "product_name", "stock_quantity"],
      colWidths: [9, 25, 9],
      colAligns: ["center", "center", "center"],
      style: {
        head: ["aqua"],
        compact: true,
      },
    });
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].stock_quantity]);
    }
    console.log("");
    console.log(table.toString());
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
  });

  inquire
    .prompt({
      name: "action",
      type: "list",
      message: "Would you like to add more Inventory?",
      choices: ["Yes", "No"],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Yes":
          addingInven();
          break;
        case "No":
          managerApp();
          break;
      }
    });

  function addingInven() {
    inquire
      .prompt({
        name: "adding",
        type: "input",
        message: "Which item_id would you like to add inventory to?",
      })
      .then(function (answer) {
        var select = answer.adding;
        connection.query(
          "SELECT * FROM products WHERE item_id=?",
          select,
          function (err, info) {
            if (err) throw err;
            console.log(info);
            inquire
              .prompt({
                name: "quantity",
                type: "input",
                message: "How many units would you like to add?",
              })
              .then(function (answ) {
                var quantity = answ.quantity;

                if (info[0].stock_quantity > 75) {
                  console.log(
                    "Our Apologies! You can not add anymore " +
                      info[0].product_name +
                      " to your inventory today."
                  );
                  addingInven();
                } else {
                  console.log("");
                  console.log(
                    "You're adding " +
                      quantity +
                      " units of " +
                      info[0].product_name +
                      " to your inventory."
                  );
                  console.log("");
                  console.log("");

                  var newQuantity = parseInt(quantity) + info[0].stock_quantity;
                  connection.query(
                    "UPDATE products SET stock_quantity = " +
                      newQuantity +
                      " WHERE item_id = " +
                      info[0].item_id,
                    function (err, resUpdate) {
                      if (err) throw err;
                      console.log("");
                      console.log("Your order has been processed!");
                      console.log("****Thank you for shopping with us!****");
                      console.log("");
                      managerApp();
                    }
                  );
                }
              });
          }
        );
      });
  }
};

var newProductAdd = function () {
  inquire
    .prompt({
      name: "action",
      type: "list",
      message: "Would you like to add a new product?",
      choices: ["Yes", "No"],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Yes":
          newItem();
          break;
        case "No":
          managerApp();
          break;
      }
    });

  function newItem() {
    inquire
      .prompt({
        name: "new",
        type: "input",
        message: "What is the item_id number for this item?",
      })
      .then(function (num) {
        var num = num.new;

        inquire
          .prompt({
            name: "new",
            type: "input",
            message: "What is the product_name of the item you would like to?",
          })
          .then(function (answer) {
            var name = answer.new;

            inquire
              .prompt({
                name: "new",
                type: "input",
                message: "What department_name does it belong to?",
              })
              .then(function (answ2) {
                var depart = answ2.new;

                inquire
                  .prompt({
                    name: "new",
                    type: "input",
                    message: "How stock_quantity would you like to add?",
                  })
                  .then(function (answ3) {
                    var stock = answ3.new;

                    inquire
                      .prompt({
                        name: "new",
                        type: "input",
                        message: "What is the starting price of the item",
                      })
                      .then(function (answ4) {
                        var price = answ4.new;

                        connection.query(
                          "INSERT INTO products SET ?",
                          {
                            item_id: num,
                            product_name: name,
                            department_name: depart,
                            stock_quantity: stock,
                            price: price,
                          },
                          function (err, res) {
                            if (err) throw err;
                            console.log("");
                            console.log("*****New product added****");
                            console.log("");
                            console.log("");
                            managerApp();
                          }
                        );
                      });
                  });
              });
          });
      });
  }
};
