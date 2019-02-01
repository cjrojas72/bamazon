
const inquirer = require("inquirer");
const connection = require("./connection");

connection.connect(function(err) {
  console.log("conecting......");
  if (err){ 
    throw err;
  }
  // run the start function after the connection is made to prompt the user
  console.log("Connected!");
  startApp();
});


function startApp(){
  inquirer.prompt({
    name: "greetings",
    type: "list",
    message: "Welcome to Bamazon! What would you like to do?",
    choices: ["view products", "buy product", "Exit"]
  }).then(function(answer){

    if(answer.greetings === "view products"){
      displayItems();
    }
    else if(answer.greetings === "buy product"){
      buyProduct();
    }
    else{
      connection.end();
    }
  });
}

function displayItems(){
  connection.query("SELECT * FROM products", function(err, results) {
    if(err) throw err;
    console.log(results);
    startApp();
  });
}

function buyProduct() {
  connection.query("SELECT * FROM products", function(err, results) {
    if(err) throw err;

  inquirer
    .prompt([
      {
        name: "item",
        type: "rawlist",
        message: "What is the item you would like to buy?",
        choices: function() {
          var itemArr = [];
          for(var i = 0; i<results.length; i++){
            itemArr.push(results[i].product_name);
          }
          return itemArr;
        }  
      },
      {
        name: "amount",
        type: "input",
        message: "How much would you like to buy?"
      }
    ])
    .then(function(answer) {
      
      var item;
      for(var i=0; i< results.length; i++){
        if(results[i].product_name === answer.item){
          item = results[i];
        }
      }

      if(item.item_quantity > parseInt(answer.amout)){
        console.log("great we have in stock!");
      }

      console.log("You chose" + item);
    });
  });
  startApp();
}
