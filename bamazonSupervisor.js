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
        choices: ["View Product Sales by Department", "Create New Department", "Exit"]
      })
    .then(function(answer) {
        switch (answer.option) {
            case "View Product Sales by Department":
              department();
              break;
      
            case "Create New Department":
              newDepartment();
              break;
      
            case "Exit":
              console.log("Goodbye!")
              connection.end();
            }
    });
}

function department(){
    
    connection.query('SELECT * FROM departments', function(err, res){
        if(err) throw err;
        console.log('>>>>>>Product Sales by Department<<<<<<');
        console.log('----------------------------------------------------------------------------------------------------')
    
        for(var i = 0; i<res.length;i++){
          console.log("Department ID: " + res[i].departmentID + " | " + "Department Name: " + res[i].departmentName + " | " + "Over Head Cost: " + (res[i].overHeadCosts).toFixed(2) + " | " + "Product Sales: " + (res[i].productSales).toFixed(2) + " | " + "Total Profit: " + (res[i].productSales - res[i].overHeadCosts).toFixed(2));
          console.log('--------------------------------------------------------------------------------------------------')
        }
        menu();
      });
}

function newDepartment() {
    console.log("\n---------------------------\n");
    console.log('---Creating New Department---');
    console.log("\n----------------------------\n");
    inquirer
    .prompt([
      {
        name: "deptName",
        type: "input",
        message: "Please enter DEPARTMENT NAME:  ",
      },
      {
        name: "ohc",
        type: "input",
        message: "Please enter OVER HEAD COSTS: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "prodSales",
        type: "input",
        message: "Please enter PRODUCT SALES:  ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
        connection.query('INSERT INTO departments SET ?',{ departmentName: answer.deptName, overHeadCosts: answer.ohc, productSales: answer.prodSales
          }, function(err, res){
            if(err) throw err;
            console.log('Another department was added.');
            menu();
          });
          
    });
    
      
}