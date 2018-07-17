//Checks and returns a user profile to the front-end for a given userID
const handleProfile = (req, res, postgres) => {
    const userId = req.body.id;
    let user = {};
    try{
        postgres.select('*')
                .from('users')
                .join('user_details', 'users.userid', '=', 'user_details.userid')
                .where('users.userid', "=", String(userId)) 
                .then( data => {

                    if (data === undefined || data.length == 0) {
                        throw "User not found";
                    }else{
                        res.json({
                            user: data[0]
                        })
                    }
                })
    } catch(err){
        res.status(404).send(err);
    }
}

module.exports = {
    handleProfile : handleProfile
}