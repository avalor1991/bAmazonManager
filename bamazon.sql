DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INTEGER(11) NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3456, "pencile","office_toys", 2.50, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6534, "pen","office_toys", 1.50, 80);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3455, "green_apple","produce", 0.80, 50);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1234, "laptop", "electronics", 400.00, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7813, "headsets","electrinics", 120.00, 12);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9864, "banana","produce", 0.50, 75);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7656,"air_plane","toys", 34.00, 21);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2211, "albow","toys",  15.00, 27);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1708, "windex","cleaning", 2.65, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8294, "kvas","drinks", 2.99, 60);

SELECT * FROM products;
