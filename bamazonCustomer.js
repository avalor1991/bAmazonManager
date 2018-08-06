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
  start();
});

function start() {
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
        name: "buyID",
        type: "input",
        message: "What is the ID of the product you would like to purchase? :  ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quant",
        type: "input",
        message: "How much would you like to purchase? : ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {

      var whatToBuy = parseInt((answer.buyID)-1);
      var howMuchToBuy = parseInt(answer.quant);
      var pTotal = parseFloat(((res[whatToBuy].price)*howMuchToBuy).toFixed(2));
      console.log(res[whatToBuy].stockQuantity);
      if(res[whatToBuy].stockQuantity >= howMuchToBuy){
  
        console.log(res[whatToBuy].stockQuantity - howMuchToBuy);
        console.log(answer.buyID);
        connection.query("UPDATE products SET stockQuantity = ? WHERE itemID = ?", [(res[whatToBuy].stockQuantity - howMuchToBuy),answer.buyID], function(err, result){
            if(err) throw (err);
            console.log("Success! Your oder has been placed Your total is $" + pTotal.toFixed(2));
            console.log("\n---------------------------------------------------------------------\n");
        });  
      } else {console.log("Sorry, there's not enough in stock!");}

      connection.end();
        });   
});
}