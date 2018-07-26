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
const register = require('./controllers/register.js')

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

app.get('/userList', (req, res) => {userList.handleUserList(req, res, postgres)});

app.get('/focusedUserID', (req,res) => {
    focusedUserIDFunction.handleFocusedUserID(req, res, focusedUserID)
});

app.post('/login', async (req, res) => {
    focusedUserID = await login.returnLogin(req, res, postgres, bcrypt);
});

app.post('/profile', (req, res) => {profile.handleProfile(req, res, postgres)});

app.post('/checkEmail', (req, res) => {checkEmail.handleCheckEmail(req, res, postgres)});

app.post('/setUserDetails', (req, res) => {setUserDetails.handleSetUserDetails(req, res, postgres, focusedUserID)});

app.post('/register', async (req, res) => {
    let result = await register.returnRegister(req, res, bcrypt, postgres);
    focusedUserID = result;
});


app.listen(3000);



//API Plan
// /login POST request. Sending the user email and password to our server to check against our database's version
    //won't be changing anything in the database, but we need it to send dat to our server
// /profile POST request. Sending the user's email (or ID) to our server to retrieve and send back their information
// /register POST request. Sends the details of the user
// /editProfile PUT request.


