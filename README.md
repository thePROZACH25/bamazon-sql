# Bamazon-sql

The goal was to create an Amazon-like store front using Node.js and MySQL.

## Getting Started

- Clone repo
- Run command in Terminal or Gitbash 'npm install'
- Run command depending which mode you would like to be on:
    * bamazonCustomer.js - 'node bamazonCustomer.js'
    * bamazonManager.js - 'node bamazonManager.js'
- Run 'ctrl + c' or arrow down to 'Exit' to exit each mode

- Make sure created your data base in MySQL
<img src="images/Screen Shot 2020-04-27 at 4.30.05 PM.png" width="200">

### What Each JavaScript Does

1. `bamazonCustomer.js`

    * Prints products in the store
    <img src="images/Screen Shot 2020-04-27 at 4.36.55 PM.png" width="200">
    
    * Prompts customer which product they would like to by ID number
    <img src="images/Screen Shot 2020-04-27 at 4.37.11 PM.png" width="200">
    
    * Then asks for the quantity

        * If there is a sufficient amount of the product in stock, it will return for that purchase.
        <img src="images/Screen Shot 2020-04-27 at 4.38.30 PM.png" width="200">

        * However, if there is not enough of the product in stock, it will tell the usere that there isn't enough of the product.
        <img src="images/Screen Shot 2020-04-27 at 4.37.48 PM.png" width="200>

        * If the purchase goes through, it updates the stock quantity to relect the purchase.
        <img src="images/Screen Shot 2020-04-27 at 4.39.04 PM.png" width="200>

-----------------------------

2. `bamazonManager.js`

    * Starts with a menu:
        * View Products for Sale
        * View Low Inventory
        * Add to Inventory
        * Add New Product
        * Exit
    
    * If the manager selects `View Products for Sale`, it lists all of the products in the store including all of their details.

    * If the manager selects `View Low Inventory`, it'll list all the products with less than five items in its stock_quantity column.

    * If the manager selects `Add to Inventory`, it allows the manager to select a product and add inventory.

    * If the manager selects `Add New Product`, it allows the manager to add a new product to the store.

    * If the manager selects `Exit`, it ends the session and doesn't go back to the menu.

## Technologies used
- Node.js
- Inquire NPM Package (https://www.npmjs.com/package/inquirer)
- MYSQL NPM Package (https://www.npmjs.com/package/mysql)
- Cli-Table2 NPM Package (https://www.npmjs.com/package/cli-table2)
### Prerequisites

```
- Node.js - Download the latest version of Node https://nodejs.org/en/
- Create a MYSQL database called 'Bamazon', reference schema.sql
```

## Built With

* Sublime Text - Text Editor
* MySQLWorkbench
* Terminal/Gitbash

## Authors

* [Zachary Ledford](https://github.com/thePROZACH25) - *JS/MySQL/Node.js* - 