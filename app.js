const express = require("express");
const app = express();
const nodeCron = require("node-cron");

const mysql = require('mysql'); 
var con = mysql.createConnection({  
    host: "localhost",  
    user: "root",  
    password: "root",  
    database: "internship"  
    });  

    con.connect( function(err) {  
        try {
            console.log("Connected!!!!!!!!!!!!!!");
        }
        catch{
            console.log(err);
        }
        
    });

const job = nodeCron.schedule("*/5 * * * *", function jobYouNeedToExecute() {
    var dateTime = new Date().toLocaleString();
    console.log(dateTime);

    var sql = "INSERT INTO data_Entry (demoentry) VALUES ?";
    var values=[
        [dateTime]
    ]
    con.query(sql,[values], function(err, result){
        if(err) throw err;
    });

  });

con.end();

app.get("/", function(req, res){
    job.start();
    console.log("hello");

});

app.listen(5000, function(){
  console.log("Server started on port 5000");
});
