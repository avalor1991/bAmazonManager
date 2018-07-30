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
  inquirer
    .prompt([
      {
        name: "buy_id",
        type: "input",
        message: "ID of the product they would like to buy: ",
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
        message: "How many units of the product they would like to buy: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {

      // When we get the answer back, we can query the database for the result
      console.log("You want to buy " + answer.quant + " items of "+ answer.buy_id);
      connection.query("SELECT * FROM products WHERE item_id = ?",
      [answer.buy_id],
      function(error,res) {
        if (error) throw error;
        // for(i=0; i < res.length; i++){
        //     console.log(res[i].position + " " + res[i].artist + " " + res[i].song + " " + res[i].year + " " + res[i].raw_total);
        // }
        console.log(res);
        if (answer.quant<res[0].stock_quantity){
          console.log("We have enaught of that product");
        }else{
          console.log("Insufficient quantity!");
        }
      });
      connection.end();
    });  

}