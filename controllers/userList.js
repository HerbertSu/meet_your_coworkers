//Fetches a list of users and their details from the database
const handleUserList = (req, res, postgres) => {
    
    postgres.select('*').from('users')
                .join('user_details', 'users.userid', '=', 'user_details.userid')
                .then(data => {
                    res.json({
                        users: data
                    });
                })
                .catch((err)=>{
                    res.status(404).send("Incorrect username or password")
                })
}

module.exports = {
    handleUserList : handleUserList
}