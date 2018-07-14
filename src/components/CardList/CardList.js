import React, { Component } from 'react';
import Card from '../Card/Card.js';

class CardList extends Component {
    render(){
        const {usersList, fetchProfile, switchProfileView} = this.props;
        
        const cardComponent = usersList.map( (user, i) =>{
            return(
                <div onClick={ 
                    () => { 
                        fetchProfile(user.userid);
                        switchProfileView();                   
                    } 
                }>
                <Card 
                    key={user.userid}
                    name={user.first_name + " " + user.last_name}
                    email={user.useremail}
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