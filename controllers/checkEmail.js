//Checks if a given email address already exists in the database
const handleCheckEmail = (req, res, postgres) =>{
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
}

module.exports = {
    handleCheckEmail : handleCheckEmail
}