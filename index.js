var express = require("express");
var bodyParser = require("body-parser");
var session = require('express-session');
var path = require('path');
var db = require('./dbConnect');

var app = express();

const port = process.env.PORT || 5000 ;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/static/login.html'));
});

app.post('/auth' , function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    //console.log('user:',username,'password:',password);
    if (username && password) {
        db.query('SELECT * FROM Accounts WHERE username = ? AND password = ?',[username,password], function(error,results,fields){
            if (error) {
                res.send('Invalid username or password');
                
            }else {
                res.redirect('/home');
            }
            res.end();
        }
        
        );
    }
    
});


app.post('/signup', (req,res) => {
    var firstName = req.body.firstname ;
    var lastName = req.body.lastname ;
    var email = req.body.email ;
    var password = req.body.password ;
    var username = req.body.username ;

    db.query('INSERT into Accounts(firstName,lastName,email,password,username) values(?,?,?,?,?)',[firstName,lastName,email,password,username],
    (error,results,fields) => {
        if (error) {
            res.send(`Error :${error.message}`);
        }
        else {
            res.send('Signup successful');
        }
    });

});

app.get('/home' , function(req,res){
    res.sendFile(path.join(__dirname+'/static/homepage.html'));

});



app.listen(port , () => {
    console.log('Server listening on Port',port);
});
