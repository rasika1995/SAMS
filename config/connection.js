var mysql = require('mysql');

var db;

var settings = {
  host:"localhost",
  user:"root",
  password:"",
  database:"crudapp"
};

function connectDatabase() {

    if(!db){
        db = mysql.createConnection(settings);
   
        db.connect(function(err) {

            if(!err){
                console.log("database connected");
            }
            else{
                console.log("error connected");
            }
        })
    }

    return db;
        
};



module.exports = connectDatabase();