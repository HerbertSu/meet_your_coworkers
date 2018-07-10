import React, { Component } from 'react';
import Card from '../Card/Card.js';

class CardList extends Component {
    render(){
        const {robotsList, fetchProfile, setFocusName, setFocusId, switchProfileView} = this.props;
        // const {fetchUserList, fetchProfile, setFocusName, setFocusId, switchProfileView} = this.props;
        // console.log("RAN")
        // let robotsList = fetchUserList();
        
        // console.log("CARDLIST ROBOTLIST",robotsList);
        
        const cardComponent = robotsList.map( (user, i) =>{
            return(
                <div onClick={ 
                    () => { 
                        console.log("CardList OnClick userid", user.userid)
                        fetchProfile(user.userid);
                        switchProfileView();                   
                    } 
                }>
                <Card 
                    key={user.userid}
                    name={user.first_name + " " + user.last_name}
                    email={user.useremail}
                    // catchphrase={user.company.catchphrase}
                />
                </div>
            )
        })
        return(
            <div className="flex flex-wrap justify-center">
                {cardComponent}
            </div>
        )
    }
}

export default CardList; 