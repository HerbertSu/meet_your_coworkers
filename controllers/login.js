//Checks the login credentials given by the front-end against the ones stored in the database
let focusedUserID = "";
const handleLogin = (req, res, postgres, bcrypt) => {

    const {email, password} = req.body;

    postgres.select('*')
            .from('users')
            .where({
                useremail : email
                })
            .then(data => { 
                focusedUserID = data[0].userid;
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
                                            users: data
                                        });
                                        usersList = data; 
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
}

module.exports = {
    handleLogin : handleLogin,
    focusedUserID : focusedUserID
}