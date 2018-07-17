//Fetches the user ID of the one currently logged in
const handleFocusedUserID = (req, res) => {
    if(focusedUserID){
        res.json({
            focusedUserID : focusedUserID
        });
    }else{
        res.status(404).send(false);
    }
}

module.exports = {
    handleFocusedUserID : handleFocusedUserID
}