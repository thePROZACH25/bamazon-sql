DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  stock_quantity INT NULL,
  price DECIMAL(10,4) NOT NULL 
);

SELECT * FROM products;

-- INSERT INTO products(product_name, department_name, stock_quantity, price)
-- VALUE
