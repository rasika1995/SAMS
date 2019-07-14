var express = require('express');
var router = express.Router();
var connection = require('../config/connection');

/* GET home page. */

//view database-------------------------------
router.get('/', function(req, res, next) {

  connection.query('SELECT * FROM users',function(err,rows){
    if(err) throw err;
   //console.log(rows);
    res.render('index', {users:rows});
  });

  
});



//insert data to database----------------------
router.post('/addUser',function(req,res){
  const userdata = {
    fname :req.body.fname,
    lname :req.body.lname,
    email :req.body.email,
    prof :req.body.prof
  }
  //console.log(userdata);
  //res.send('Data inserted');

  connection.query('INSERT INTO users SET?',userdata,function(err,result){
    if(err) throw err;
    res.redirect('/');
  });
});



//delete user data--------------------------------
router.get('/deleteUser/:id',function(req,res){
  var userid = req.params.id;

  //console.log(userid);
  //res.send('id is removed');
  connection.query('DELETE FROM users WHERE id = ?',[userid],function(err,rows){
    if(err) throw err;
    res.redirect('/');
  });
  
});


//edit user data----------------------------------------
router.get('/edit/:id',function(req,res){
  var userid = req.params.id;

  // res.render('edit');
  connection.query('SELECT * FROM users WHERE id = ?',[userid],function(err,rows){
    if(err) throw err;
    res.render('edit',{userdata:rows});
  });
  
});

//update user data---------------------------------------

router.post('/updateUser/:id',function(req,res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var prof = req.body.prof;

    var updateId = req.params.id;

  connection.query('UPDATE users SET fname = ?,lname = ?,email=?,prof = ? WHERE id = ? ' ,[fname,lname,email,prof,updateId],function(err,result){
    if(err) throw err;
    res.redirect('../../');
    
  });
  
});


module.exports = router;
