DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  itemID MEDIUMINT AUTO_INCREMENT NOT NULL,
  productName VARCHAR(45) NOT NULL,
  departmentName VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stockQuantity INT NULL,
  productSales INT NULL,
  PRIMARY KEY (itemID)
);


CREATE TABLE departments (
  department_id MEDIUMINT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs  INT NULL,
  PRIMARY KEY (itemID)
);

INSERT INTO products (productName, departmentName, price, stockQuantity, productSales)
VALUES ("pencile","office", 2.50, 100),
		("pen","office", 1.50, 80),
		("green_apple","produce", 0.80, 50),
		("laptop", "electronics", 400.00, 5),
		("headsets","electronics", 120.00, 12),
		("banana","produce", 0.50, 75),
		("plane","toys", 34.00, 21),
		("albow","toys",  15.00, 27),
		("windex","cleaning", 2.65, 100),
		("kvas","drinks", 2.99, 60);

SELECT * FROM products;


