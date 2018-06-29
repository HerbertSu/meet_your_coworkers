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

//TODO when we add a "Change User Details" button, make sure that when someone signs in, their userId gets saved to focusedUserID
let focusedUserID = "";
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




app.post('/setUserDetails', (req,res) => {
    //what if values are empty? 
        //Answer: the update method automatically ignores undefined values
    //No username field needed. Just have screen say "Hello __firstName"
    //Might have to make sure that the date format of the input is the same as that
        //accepted by postgresql
    
    let errorExists = false;
    const { joinDate, 
        batch, 
        techTrained, 
        techInterest, 
        tv, 
        hobbies, 
        currentProject, 
        previousProjects
    }
    = req.body;
    
    postgres.update({
                batch : batch,
                batch_tech: techTrained,
                tech_interested_in : techInterest,
                favorite_tv : tv,
                hobbies : hobbies,
                current_project : currentProject,
                previous_projects : previousProjects,
                joining_date : joinDate
            })
            .into('user_details')
            .where('userid', "=", String(focusedUserID)) 
            .returning("userid")
            .then(userid => {
                console.log("focusedUserID ", focusedUserID)
                console.log("userid ", userid)
            })
            .catch(() => {errorExists = true});
    if(errorExists){
        res.status(404).send(false); //unsuccessful
    }else{
        res.json({focusedUserID: focusedUserID}) //successful
    }
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


