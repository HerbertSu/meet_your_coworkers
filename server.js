const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const userList = require('./controllers/userList.js');
const focusedUserIDFunction = require('./controllers/focusedUserIDFunction.js');
const login = require('./controllers/login.js')
const profile = require('./controllers/profile.js');
const checkEmail = require('./controllers/checkEmail.js');
const setUserDetails = require('./controllers/setUserDetails.js');

const app = express();
const postgres = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'herbert.su',
        password: 'password',
        database: 'social_cards'
    }
});

app.use( cors(), bodyParser.json());

let focusedUserID = "";
let usersList = [];

//TODO
//When everything is in one file, everything works. However, when trying to update focusedUserID or usersList in separate
    //files, these changes are not reflected back here. This proves to be a problem when we want to send
    //the values of these variables to the front-end


app.get('/userList', (req, res) => {userList.handleUserList(req, res, postgres)});

app.get('/focusedUserID', (req,res) => {focusedUserIDFunction.handleFocusedUserID(req, res, focusedUserID)});

app.post('/login', (req, res) => {
    focusedUserID = login.focusedUserID;
    return login.handleLogin(req, res, postgres, bcrypt);
});

app.post('/profile', (req, res) => {profile.handleProfile(req, res, postgres)});

app.post('/checkEmail', (req, res) => {checkEmail.handleCheckEmail(req, res, postgres)});

app.post('/setUserDetails', (req, res) => {setUserDetails.handleSetUserDetails(req, res, postgres, focusedUserID)});

// app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, postgres, focusedUserID)});

app.post('/register', (req, res) => {

    const { firstName,lastName,email,password } = req.body;

    bcrypt.hash(password, null, null, function(err, result) {

        postgres.transaction( trx => {
    
            try{
                
                trx.insert({
                    useremail:email
                })
                .into('users')
                .returning('userid')
                .then( userid => {
                    return trx.insert({
                            userid: parseInt(userid),
                            hash: result
                        })
                        .into('login') 
                        .returning("userid")
                        .then(userid => {
                            //To be used in /setUserDetails after a user has registered
                            focusedUserID = String(userid);
                            return trx.insert({
                                userid: parseInt(userid),
                                first_name: firstName,
                                last_name: lastName
                            })
                            .into('user_details')
                        .catch(err =>{
                            throw err;
                            return res.status(404).send("could not insert")
                            })
                        })
                })
                .then(()=> {
                    res.send("Successful")      //Post seems to need to send something to complete.
                })
                .then(trx.commit)
                // .then(()=>{
                //     res.send(true);
                // })
                .catch((err) => {
                    if(err.constraint === "users_useremail_key"){
                        res.status(499).send(false);
                    }else{
                        res.status(404).send(false);
                    }
                    return trx.rollback;
                })

            } catch(err) {
                res.status(404).send("Could not insert for some reason");
            }  
        }); 
          
    });
    
})

app.listen(3000);



//API Plan
// /login POST request. Sending the user email and password to our server to check against our database's version
    //won't be changing anything in the database, but we need it to send dat to our server
// /profile POST request. Sending the user's email (or ID) to our server to retrieve and send back their information
// /register POST request. Sends the details of the user
// /editProfile PUT request.


