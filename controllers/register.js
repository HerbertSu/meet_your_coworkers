//Registers a new user by saving their details in the database
let focusedUserID = "";

const handleRegister = (req, res, bcrypt, postgres, focusedUserID) => {
    
    const { firstName, lastName, email, password } = req.body;

    console.log("handleRegister before bcrypt")
    // const emptyPromise = new Promise((resolve, reject) => {
    bcrypt.hash(password, null, null, async function(err, result) {
        await postgres.transaction( trx => {
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
                            console.log("Setting focusedUserID to ", focusedUserID )
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
//     resolve("Done");
// });
}


const returnRegister = async (req, res, bcrypt, postgres, focusedUserID) => {
    console.log("before returnRegister - focusedUserID in register.js", focusedUserID);
    await handleRegister(req, res, bcrypt, postgres, focusedUserID);
    
    console.log("after returnRegister - focusedUserID in register.js", focusedUserID);
    return focusedUserID;
}

module.exports = {
    returnRegister : returnRegister
}