//Registers a new user by saving their details in the database
let focusedUserID = "";

const handleRegister = async (req, res, bcrypt, postgres) => {
    
    const { firstName, lastName, email, password } = req.body;

    let result = bcrypt.hash(password, null, null, async (err, result) => {
        return result
    });
        
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
}

const returnRegister = async (req, res, bcrypt, postgres) => {
    await handleRegister(req, res, bcrypt, postgres);
    return focusedUserID;
}

module.exports = {
    returnRegister : returnRegister
}