
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
      viewInventory();
    }
    else if(answer.greetings === "buy product"){
      buyProduct();
    }
    else{
      connection.end();
    }
  });
}