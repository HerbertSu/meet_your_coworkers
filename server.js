const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

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


let robotsList = [];

app.get('/', (req, res) => {
    res.send({"hi":"this is working"})
})


app.get('/userList', (req,res) => {
    
    postgres.select('*').from('users')
                .join('user_details', 'users.userid', '=', 'user_details.userid')
                .then(data => {
                    res.json({
                        robots: data
                    });
                })
                .catch((err)=>{
                    res.status(404).send("Incorrect username or password")
                })

})





app.post('/login', (req, res) => {
    const {email, password} = req.body;
        
        postgres.select('*')
                .from('users')
                .where({
                    useremail : email
                    })
                .then(data => { 
                    postgres.select('hash')
                        .from('login')
                        .where({
                            userid : data[0].userid
                        })
                        .then(hashedPass=> {
                            bcrypt.compare(password, hashedPass[0].hash, function(err, result){
                                if(result){
                                    postgres.select('*').from('users')
                                        .join('user_details', 'users.userid', '=', 'user_details.userid')
                                        .then(data => {
                                            res.json({
                                                robots: data
                                            });
                                            robotsList = data; 
                                        })
                                        .catch((err)=>{
                                            res.status(404).send()
                                        })
                                }else{
                                    res.status(404).send()
                                }
                            });
                        })
                        .catch( (err) =>{
                            res.status(404).send()
                        })
                })
                .catch( (err) => {
                    res.status(404).send()
                });
})


app.post('/profile', (req, res) => {
    const userId = req.body.id;
    let user = {};
    try{
        robotsList.some( (robot) => {
            if (String(robot.userid) === String(userId)){
                res.json({
                    robot: robot
                });
                return user = robot;
            }
        }) 

        if(Object.keys(user).length === 0 && user.constructor === Object){
            throw "User not found";
        }
    } catch(err){
        res.status(404).send(err);
    }
})



app.post('/checkEmail', (req, res) =>{
    const {email} = req.body;
    
    postgres.transaction( trx=>{
        trx.insert({
            useremail:email
        })
        .into('users')
        .catch((err) => {
            if(err.constraint === "users_useremail_key"){
                res.status(299).send(false);
            }
            return trx.rollback;
        })

        .then(()=>{
            res.status(200).send(true);
            return trx.rollback})
    })

})


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
                        
                        .catch(err =>{
                            throw err;
                            return res.status(404).send("could not insert")
                        })
                })
                .then( () =>{
                    return trx.select('*')
                        .from('users')
                        .join('user_details', 'users.userid', '=', 'user_details.userid')
                        .then(data => {
                            res.json({
                                robots: data
                            });
                            robotsList = data; 
                        })
                        .catch((err) => {
                            console.log("Could not retrieve users in /register", err)
                        })
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
                res.status(404).send("could not insert");
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


