var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  menu();
});

function menu (){
    inquirer
    .prompt({
        name: "option",
        type: "list",
        message: "Select an option from the list",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
      })
    .then(function(answer) {
        switch (answer.option) {
            case "View Products for Sale":
              productSale();
              break;
      
            case "View Low Inventory":
              lowInventory();
              break;
      
            case "Add to Inventory":
              addInventory();
              break;
      
            case "Add New Product":
              addProduct();
              break;

            case "Exit":
              console.log("Goodbye!")
              connection.end();
            }
    });
}

function productSale (){
    console.log("Viewing products for sale");
    connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;
        console.log('----------------------------------------------------------------------------------------------------');
        for(var i = 0; i<res.length;i++){
          console.log("ID: " + res[i].itemID + " | " + "Product: " + res[i].productName + " | " + "Department: " + res[i].departmentName + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stockQuantity);
          console.log('--------------------------------------------------------------------------------------------------');
        }
        menu();
    });
}

function lowInventory (){
    console.log("Viewing Low Inventory");
    var query = "SELECT * FROM products GROUP BY stockQuantity HAVING stockQuantity <= 5";
    connection.query(query, function(err, res) {
        if(err) throw err;
        // console.log(res);
        if (res.length===0){
            console.log("There is no low inventory");
        }else{
    for (var i = 0; i < res.length; i++) {
    console.log("ID: " + res[i].itemID + " | " + "Product: " + res[i].productName + " | " + "Department: " + res[i].departmentName + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stockQuantity);
        }  
    }
    menu();
  });
}

function addInventory (){
    console.log("Add Inventory");
    connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;
        console.log('----------------------------------------------------------------------------------------------------');
        for(var i = 0; i<res.length;i++){
          console.log("ID: " + res[i].itemID + " | " + "Product: " + res[i].productName + " | " + "Department: " + res[i].departmentName + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stockQuantity);
          console.log('--------------------------------------------------------------------------------------------------');
        }
   
    inquirer
    .prompt([
        {
            name: "idNum",
            type: "input",
            message: "Please Enter the ID number of product would you like to work with: "
        },
        {
            name: "addInventory",
            type: "input",
            message: "How much would you like to add?",
            validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }
        }
    ])
    .then(function(answer) {
        // console.log(answer.addInventory);
        // console.log(answer.idNum);
        connection.query("UPDATE products SET stockQuantity = ? WHERE itemID = ?",
            [(res[answer.idNum-1].stockQuantity + parseInt(answer.addInventory)), answer.idNum],
            function(err) {
              if (err) throw err;
              console.log("Update successfully!");
              menu();
            }
          );
    });
});
}

function addProduct (){
    console.log("Add Product");
    inquirer
    .prompt([
        {
            name: "idNum",
            type: "input",
            message: "Please Enter the ID number: "
        },
        {
            name: "product",
            type: "input",
            message: "Please Enter product name: "
        },
        {
            name: "dep",
            type: "input",
            message: "Please Enter department name: "
        },
        {
            name: "price",
            type: "input",
            message: "Please Enter price: "
        },
        {
            name: "qty",
            type: "input",
            message: "Please Enter Quantity: ",
            validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }
        }
    ])
    .then(function(answer) {
        // 
        connection.query("INSERT INTO products SET ?",
        {
            itemID: parseInt(answer.idNum),
            productName: answer.product,
            departmentName: answer.dep,
            price: parseFloat(answer.price),
            stockQuantity:parseInt(answer.qty)
        },
            function(err) {
              if (err) throw err;
              console.log("Update successfully!");
              menu();
            }
          );
    });
}