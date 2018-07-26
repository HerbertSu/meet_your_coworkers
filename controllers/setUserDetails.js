//Saves/updates a user's details in the database
const handleSetUserDetails = (req, res, postgres, focusedUserID) => {
    //What if the values given in the body are empty? 
        //Answer: The update method automatically ignores undefined values
    //postgres.update() ignores invalid date formats
    
    let errorExists = false;

    const {joinDate, 
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
            .returning("*")
            .catch(() => {
                errorExists = true;
            });
    if(errorExists){
        res.status(404).send(false); //unsuccessful
    }else{
        res.json({focusedUserID: focusedUserID}) //successful
    }
}

module.exports = {
    handleSetUserDetails : handleSetUserDetails
}